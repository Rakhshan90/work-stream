import AppBar from '@/components/appbar'
import CreateProject from '@/components/create-project'
import React from 'react'

const page = () => {
  return (
    <div>
      <AppBar />
      <div className='m-4 flex-1'>
        <CreateProject />
      </div>
    </div>
  )
}

export default page