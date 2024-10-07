import MultiSelect from '@/components/add-member'
import React from 'react'


export default function Page({ params }: { params: { slug: string } }) {

  return (
    <div className='m-4 flex-1'>
        <MultiSelect projectId={Number(params.slug)} />
    </div>
  )
}