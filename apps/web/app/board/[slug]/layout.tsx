import DashboardAppbar from '@/components/dashboard-appbar'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Layout({ children, params }: { children: React.ReactNode, params: {slug: string} }) {

    return (
        <div className="flex flex-col">
            <DashboardAppbar />
            <div className='flex'>
                <Sidebar params={params} />
                {children}
            </div>
        </div>
    )
}