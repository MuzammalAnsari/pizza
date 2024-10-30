import mongoose from "mongoose";
import { User } from "../../models/user";
import { isAdmin } from "../../utils/auth";

export async function GET(req) {
    try {
        // Connect to MongoDB if not already connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGO_URL);
        }

        // Check if the user is an admin
        if (await isAdmin(req)) {
            const users = await User.find(); // Fetch all users
            return new Response(JSON.stringify(users), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            // Return an empty array if not an admin
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        // Handle errors appropriately
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
