// src/app/libs/authOptions.js

import clientPromise from "../../libs/mongoConnect"; // Adjust the path as necessary
import bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "../models/user"; // Adjust the path as necessary
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};
        if (!email || !password) {
          throw new Error("Email and password are required.");
        }

        try {
          await mongoose.connect(process.env.MONGO_URL);
          const user = await User.findOne({ email });
          if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error("Invalid email or password.");
          }
          return user; // Return the user object if credentials are valid
        } catch (error) {
          console.error("Authorization error:", error);
          return null; // Handle errors appropriately
        }
      },
    }),
  ],
};
