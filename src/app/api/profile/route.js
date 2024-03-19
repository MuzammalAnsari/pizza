import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT() {
    mongoose.connect(process.env.MONGO_URL)
    const data = await req.json()
    const session = getServerSession(authOptions)
    console.log('session', session)


    if ('name' in data) {
        //update user name

    }
    return Response.json(true)
}
