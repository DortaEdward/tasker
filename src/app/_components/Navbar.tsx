import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="min-w-screen h-16 flex items-center justify-between px-6">
      <div>
        <p className="text-2xl font-bold text-white">
          Tasker
        </p>
      </div>
      <SignedIn>
        <div className="flex-1 flex items-center justify-center">
          <Link href="/dashboard" className="text-white">Dashboard</Link>
        </div>
      </SignedIn>
      <div>
        <SignedOut>
          <div className="bg-teal-500 font-semibold text-white px-4 py-1 rounded-md text-sm">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
          <div className="bg-teal-500 font-semibold text-white px-4 py-1 rounded-md text-sm">
            <SignUpButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  )
}