import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../config/authOptions'

const page = async() => {

    const session = await getServerSession(authOptions);

  return (
    <div>
        {session.user && JSON.stringify(session)}
    </div>
  )
}

export default page