import MultiSelect from '@/components/add-member'
import React from 'react'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/config/authOptions';
import { getUserRole } from '@/lib/user/getUserRole';


export default async function Page({ params }: { params: { slug: string } }) {

  const session = await getServerSession(authOptions);
  const role = await getUserRole(Number(session?.user?.id));

  return (
    <div className='m-4 flex-1'>
      <MultiSelect role={role} projectId={Number(params.slug)} />
    </div>
  )
}