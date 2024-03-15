import { User } from "@/app/models/user"
import mongoose from 'mongoose';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
export async function POST(req) {
    // mongoose.connect(process.env.MONGO_URL);
    // const body = await req.json()
    // const createdUser = await User.create(body)
    // return Response.json(createdUser)
    try {
        // Connect to MongoDB using the MONGO_URL environment variable
        console.log("MONGO_URL:", process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL);

        // Parse JSON body from request
        const body = await req.json();

        // Create a new user with the parsed body
        const createdUser = await User.create(body);

        // Return the created user as JSON response
        return Response.json(createdUser);
    } catch (error) {
        // Handle any errors that occur during database connection or user creation
        console.error("Error:", error);
        // Return an error response
        return Response.error(500, "Internal Server Error");
    }
}