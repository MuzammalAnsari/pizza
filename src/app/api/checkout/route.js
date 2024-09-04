import mongoose from "mongoose"
import { getServerSession } from "next-auth";
const stripe = require('stripe')(process.env.STRIPE_SK)
import {MenuItem} from "../../models/MenuItem"
import { authOptions } from "../auth/[...nextauth]/route";
import { Order } from "../../models/Order";

export async function POST(req){
    mongoose.connect(process.env.MONGO_URL);
    const {cartProducts, address} = await req.json();
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;

    const OrderDoc = await Order.create({
        userEmail,
        ...address,
        cartProducts,
        paid: false
    })

    const stripeLineItems = [];
    for(const cartProduct of cartProducts){

        //finding the product from menu item to calculate the prcice
        const productInfo = await MenuItem.findById(cartProduct._id);

        let productPrice = productInfo.basePrice;

        if(cartProduct.size){
            productPrice = productInfo.sizes.find((size) => size._id.toString() === cartProduct.size._id.toString()).price
        }

        if (cartProduct.extras?.length > 0) {
            for (const cartProductExtraThing of cartProduct.extras) {
              const extraThingInfo = productInfo.extraIngredientsPrices.find(
                (extraThing) => extraThing._id.toString() === cartProductExtraThing._id.toString()
              );
              
              if (extraThingInfo) {
                productPrice += extraThingInfo.price;
              }
            }
          }
          


        const productName = cartProduct.name;

        stripeLineItems.push({
            quantity: 1,
            price_data: {
                currency: 'MYR',
                product_data: {
                    name: productName
                },
                unit_amount: productPrice * 100
            },
        })
    }

    const stripeSession = await stripe.checkout.sessions.create({
        line_items: stripeLineItems,
        mode: 'payment',
        customer_email: userEmail,
        success_url: process.env.NEXTAUTH_URL + 'orders/' + OrderDoc._id.toString() + '?clear-cart=1',
        cancel_url: process.env.NEXTAUTH_URL + 'cart?cancelled=1',
        metadata: { orderId: OrderDoc._id.toString()},
        payment_intent_data: {
            metadata: { orderId: OrderDoc._id.toString()},
        },
        shipping_options:[
            {
                shipping_rate_data: {
                    display_name: 'Delivery Fee',
                    type: 'fixed_amount',
                    fixed_amount: {amount: 500, currency: 'MYR'},
                }
            }
        ]
    });

    return Response.json(stripeSession.url);

}