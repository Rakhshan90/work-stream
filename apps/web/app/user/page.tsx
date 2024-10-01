import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../config/authOptions'

const page = async () => {

  const session = await getServerSession(authOptions);
  console.log(JSON.stringify('session:', session));

  return (
    <div className='text-white'>
      {session?.user ? (
        <p>{JSON.stringify(session)}</p>
      ) : (
        <p>No session found</p>
      )}
    </div>
  )
}

export default page