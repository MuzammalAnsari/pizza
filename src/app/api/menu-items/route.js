import mongoose from "mongoose"
import { MenuItem } from "../../models/MenuItem"
import { isAdmin } from "../../utils/auth"

export async function POST(req) {
mongoose.connect(process.env.MONGO_URL)
const data = await req.json()
if(await isAdmin(req)){
    const menuItemDoc = await MenuItem.create(data)
    return Response.json(menuItemDoc)
}else{
    return Response.json({})
}
}

//get
export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const menuItems = await MenuItem.find()
    return Response.json(menuItems)
}

//put
export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL)
    if(await isAdmin(req)){
        const {_id, ...data} = await req.json()
        await MenuItem.findByIdAndUpdate(_id, data)
    }
    return Response.json(true)
}

//delete
export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    if(await isAdmin(req)){
        await MenuItem.deleteOne({_id})
    }
    return Response.json(true)
}