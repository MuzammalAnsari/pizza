import mongoose from "mongoose"
import { MenuItem } from "../../models/MenuItem"

export async function POST(req) {
mongoose.connect(process.env.MONGO_URL)
const data = await req.json()
const menuItemDoc = await MenuItem.create(data)
return Response.json(menuItemDoc)
}

//get

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const menuItems = await MenuItem.find()
    return Response.json(menuItems)
}