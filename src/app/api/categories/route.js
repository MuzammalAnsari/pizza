import mongoose from "mongoose";
import { Category } from "../../models/Category";

export async function POST(res) {
    mongoose.connect(process.env.MONGO_URL)
    const { name } = await res.json();
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
}

export async function GET() {
    mongoose.connect(process.env.MONGO_URL)
    const categories = await Category.find();
    return Response.json(categories);
}

export async function PUT(res) {
    mongoose.connect(process.env.MONGO_URL)
    const { _id, name } = await res.json();
    const categoryDoc = await Category.findOneAndUpdate({ _id }, { name });
    return Response.json(categoryDoc);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await Category.deleteOne({_id})
    return Response.json(true);
}