import { User } from "@/app/models/user"
import mongoose from 'mongoose';

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const body = await req.json()
    const createdUser = await User.create(body)
    return Response.json(createdUser)

}