"use server";
import { cookies } from "next/headers";
const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;
  // console.log("refreshToken on Server: ", token);
  return token;
};

export { getRefreshToken };
