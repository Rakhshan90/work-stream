'use client';

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Layers } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const router = useRouter();
  const session = useSession();
  const authenticated = session.status === 'authenticated';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-600 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Layers className="h-6 w-6 text-white" />
            <span className="hidden font-bold sm:inline-block text-white">
              Workstream
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium text-white">
            <Link href="/features">Features</Link>
            <Link href="/board-list">Dashboard</Link>
          </nav>
        </div>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only text-white">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 bg-slate-900 text-white">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsMobileMenuOpen}
            >
              <Layers className="mr-2 h-4 w-4" />
              <span className="font-bold">Workstream</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <MobileLink
                  href="/features"
                  onOpenChange={setIsMobileMenuOpen}
                >
                  Features
                </MobileLink>
                <MobileLink
                  href="/board-list"
                  onOpenChange={setIsMobileMenuOpen}
                >
                  Dashboard
                </MobileLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search functionality here if needed */}
          </div>
          <nav className="flex items-center">
            {authenticated ? (
              <Button onClick={() => signOut()} variant="ghost" className="mr-2 bg-red-600 text-white">
                Sign Out
              </Button>
            ) : (
              <>
                <Button onClick={() => signIn()} variant="ghost" className="mr-2 bg-blue-600 text-white">
                  Sign In
                </Button>
                <Button onClick={() => router.push('/signup')}>Sign Up</Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
}