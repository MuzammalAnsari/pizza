// src/app/utils/auth.js

import { getServerSession } from "next-auth"; 
import { authOptions } from "./authOptions"; 
import { UserInfo } from "../models/userInfo";

export async function isAdmin(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) return false;

  const userInfo = await UserInfo.findOne({ email: userEmail });
  return userInfo ? userInfo.admin : false; // Return true or false based on admin status
}