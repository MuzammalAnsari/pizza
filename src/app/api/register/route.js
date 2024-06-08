// /pages/api/register/index.js
import { auth, db } from '../../../libs/firebaseAdmin';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export async function POST(req) {
  try {
    const body = await req.json();
    const pass = body.password;
    if (!pass?.length || pass.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);

    const userRecord = await auth.createUser({
      email: body.email,
      password: notHashedPassword,
    });

    await db.collection('users').doc(userRecord.uid).set({
      email: body.email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ uid: userRecord.uid, email: userRecord.email }), { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
