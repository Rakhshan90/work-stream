import { authOptions } from "@/app/config/authOptions";
import TaskList from "@/components/task-list";
import { getUserRole } from "@/lib/user/getUserRole";
import { getServerSession } from "next-auth";


export default async function Page({ params }: { params: { slug: string } }) {

  const session = await getServerSession(authOptions);
  const role = await getUserRole(Number(session?.user?.id));

  return (
    <div className="m-4 flex-1">
      <TaskList role={role} id={Number(params.slug)} />
    </div>
  )
}