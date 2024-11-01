import { isManager } from "@/actions/userAction";
import { authOptions } from "@/app/config/authOptions";
import NotAllowed from "@/components/not-allowed";
import { getUserRole } from "@/lib/user/getUserRole";
import { getServerSession } from "next-auth";


export default async function Layout({children}: {children: React.ReactNode}){

    const session = await getServerSession(authOptions);
    const role = await getUserRole(Number(session?.user?.id));
    if(role !== 'MANAGER'){
        return (
            <NotAllowed />
        )
    }
    else{
        return (
        <>
           {children}
        </>
        )
    }
}