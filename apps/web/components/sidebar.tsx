"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, UserRoundPlus } from "lucide-react"

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true)

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <div className={`h-screen bg-slate-900 px-3 py-2 border-r border-slate-600 ${isOpen ? 'w-64' : 'w-0'} transition duration-300`}>
            {!isOpen && (
                <Button onClick={toggleSidebar} className="bg-slate-800 h-6 w-6 px-1 rounded-full">
                    <ChevronRight className="font-bold" />
                </Button>
            )}
            {isOpen && (
                <div className="w-full flex flex-col gap-6">
                    {/* item 1 */}
                    <div className="w-full flex justify-between items-center border-b border-slate-600 py-2">
                        <div className="text-slate-200 font-semibold">Workspace</div>
                        <Button onClick={toggleSidebar} className="bg-slate-800 h-6 w-6 px-1 rounded-full">
                            <ChevronLeft className="font-bold" />
                        </Button>
                    </div>
                    {/* item 2 */}
                    <div className="w-full flex flex-col gap-2 items-start py-3">
                        <NavItem href="/board-list" icon={<LayoutDashboard />}>
                            boards
                        </NavItem>
                        <NavItem href="/board-list" icon={<Users />}>
                            Members
                        </NavItem>
                        <NavItem href="/board-list" icon={<UserRoundPlus />}>
                            Add member
                        </NavItem>
                    </div>

                    {/* item 3 */}
                    <div className="w-full flex flex-col gap-2 items-start pb-3">
                        <h3 className="text-slate-300 text-left">
                            Your boards
                        </h3>
                        <NavItem href="/board/:1" icon={<LayoutDashboard />}>
                            my board
                        </NavItem>
                    </div>
                </div>
            )}
        </div>
    )
}

function NavItem({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="w-full flex gap-2 items-center px-4 py-2 text-slate-200 hover:bg-slate-800 rounded-xl"
        >
            {icon}
            {children}
        </Link>
    )
}