import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ServerAuthGuard = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const hasAccessToken = cookieStore.get("accessToken");
  if (!hasAccessToken) {
    redirect("/onboarding");
  }
  return <>{children}</>;
};

export default ServerAuthGuard;
