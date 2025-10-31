"use server";
import { cookies } from "next/headers";
const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  // console.log("accessToken on Server: ", token);
  return token;
};

export { getToken };
