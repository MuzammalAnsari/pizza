// src/app/utils/auth.js

import { getServerSession } from "next-auth"; // Import getServerSession
import { authOptions } from "./authOptions"; // Adjust the import based on your structure
import { UserInfo } from "../models/userInfo"; // Adjust the path if necessary

export async function isAdmin(req) {
  const session = await getServerSession({ req }, authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;

  const userInfo = await UserInfo.findOne({ email: userEmail });
  return userInfo ? userInfo.admin : false; // Return true or false based on admin status
}