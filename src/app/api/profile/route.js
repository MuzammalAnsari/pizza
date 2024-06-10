
import { db } from '../../../libs/firebaseAdmin';
import { getServerSession } from "next-auth/react";

export async function PUT(req) {
  try {
    const data = await req.json();
    const { phone, streetAddress, postalCode, city, country } = data;
    const session = await getServerSession();
    const email = session?.user?.email;

    const userRef = db.collection('users').doc(email);

    await userRef.set({
      phone,
      streetAddress,
      postalCode,
      city,
      country,
    }, { merge: true });

    return new Response(JSON.stringify(true), { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
