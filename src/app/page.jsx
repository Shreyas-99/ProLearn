
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PageLanding from "./PageLanding";

export default async function Page() {
  const { userId } = await auth();

  if (userId) {
    redirect("/home");
  }

  // User is not logged in → show landing page
  return <PageLanding />;
}
