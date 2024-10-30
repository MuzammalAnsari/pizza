import mongoose from "mongoose";
import { User } from "../../models/user";
import { isAdmin } from "../../utils/auth"



export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    if(await isAdmin(req)){
        const users = await User.find();
        return Response.json(users);
    }else{
        return Response.json([]);
    }
   
}