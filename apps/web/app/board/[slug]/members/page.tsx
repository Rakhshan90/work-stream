import { getProjectEmployees } from '@/actions/userAction'
import MemberList from '@/components/member-list'
import React from 'react'

const page = async({ params }: { params: { slug: string } }) => {

  const getEmployees = async ()=>{
    const res = await getProjectEmployees(Number(params.slug))
    return res.employees
  }

  const employees = await getEmployees();

  return (
    <div className='m-4 flex-1'>
      <MemberList employees={employees} />
    </div>
  )
}

export default page