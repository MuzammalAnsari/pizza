import { Category } from "../../models/Category";

export async function POST(res) {
    const { name } = await res.json();
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
}

export async function GET() {
    const categories = await Category.find();
    return Response.json(categories);
}

export async function PUT(res) {
    const { _id, name } = await res.json();
    const categoryDoc = await Category.findOneAndUpdate({ _id }, { name });
    return Response.json(categoryDoc);
}