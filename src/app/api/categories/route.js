import mongoose from "mongoose";
import { Category } from "../../models/Category";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(res) {
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await res.json();
  if (await isAdmin()) {
    const categoryDoc = await Category.create({ name });
    return Response.json(categoryDoc);
  } else {
    return Response.json({});
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  const categories = await Category.find();
  return Response.json(categories);
}

export async function PUT(res) {
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await res.json();
  if (await isAdmin()) {
    await Category.findOneAndUpdate({ _id }, { name });
  }
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await Category.deleteOne({ _id });
  }
  return Response.json(true);
}
