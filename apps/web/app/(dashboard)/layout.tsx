import DashboardAppbar from '@/components/dashboard-appbar'
import Sidebar from '@/components/sidebar'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex flex-col">
            <DashboardAppbar />
            <div className='flex'>
                <Sidebar />
                {children}
            </div>
        </div>
    )
}