import { authOptions } from "@/db/options";
import nextAuth from "next-auth";

const handler = nextAuth(authOptions);
export { handler as GET, handler as POST }