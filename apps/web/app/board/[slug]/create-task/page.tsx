import { authOptions } from '@/app/config/authOptions';
import CreateTask from '@/components/create-task';
import { getUserRole } from '@/lib/user/getUserRole';
import { getServerSession } from 'next-auth';
import React from 'react'


export default async function Page({ params }: { params: { slug: string } }) {

    const session = await getServerSession(authOptions);
    const role = await getUserRole(Number(session?.user?.id));

    return (
        <div className='m-4 flex-1'>
            <CreateTask role={role} id={Number(params.slug)} />
        </div>
    )
}