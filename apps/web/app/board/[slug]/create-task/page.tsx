import CreateTask from '@/components/create-task';
import { getRole } from '@/lib/user/userRole'
import React from 'react'


export default async function Page({ params }: { params: { slug: string } }) {


    const role = await getRole();

    return (
        <div className='m-4 flex-1'>
            {role ? (
                <CreateTask id={Number(params.slug)} />
            ) : null}
        </div>
    )
}