import NextAuth from "next-auth";
import { authOptions } from "../../../utils/authOptions"; 

// Define the NextAuth handler
const handler = NextAuth(authOptions);

// Export GET and POST handlers
export { handler as GET, handler as POST };
