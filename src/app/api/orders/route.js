import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/authOptions";
import { Order } from "../../models/Order";
import { isAdmin } from "../../utils/auth";


export async function GET(req) {
  try {
    mongoose.connect(process.env.MONGO_URL);

    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email;
    const admin = await isAdmin(req);

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");

    if (_id) {
      const order = await Order.findById(_id);
      if (!order) {
        return new Response(JSON.stringify({ message: "Order not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(order), { status: 200 });
    }

    let orders;
    if (admin) {
      orders = await Order.find();
    } else if (userEmail) {
      orders = await Order.find({ userEmail });
    } else {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 403,
      });
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
}
