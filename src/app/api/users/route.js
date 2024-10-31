import mongoose from "mongoose";
import { User } from "../../models/user";
import { isAdmin } from "../../utils/auth";

export async function GET() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
    //   console.log('Connected to MongoDB');
      if (await isAdmin()) {
        const users = await User.find();
        // console.log('Users fetched:', users); 
        return new Response(JSON.stringify(users), { status: 200 });
      } else {
        // console.log('User is not an admin');
        return new Response(JSON.stringify([]), { status: 200 });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
  
  