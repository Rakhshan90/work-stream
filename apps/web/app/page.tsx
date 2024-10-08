import AppBar from "@/components/appbar";
import { authOptions } from "./config/authOptions";
import { getServerSession } from "next-auth";
import { getUserRole } from "@/lib/user/getUserRole";
import LandingPage from "@/components/landing-page";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const role = await getUserRole(Number(session?.user?.id));

  return (
    <div className="bg-black">
      <AppBar role={role} />
      <LandingPage />
    </div>
  );
}
