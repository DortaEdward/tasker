import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col gap-4 items-center justify-center">
      <div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white max-w-2xl text-center tracking-wider">Just your typical run in mill Task Manager</h1>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg leading-8 text-gray-400">Staying on task is hard. Managing apps need to improve.</p>
        <div className="px-3 bg-teal-400 py-1 font-semibold rounded-md w-32 text-center text-white">
          <SignedIn>
            <Link href="/dashboard">Dashboard</Link>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              Get Started
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
