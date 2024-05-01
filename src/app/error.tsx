'use client'

import Link from "next/link"

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="w-full h-[86vh] flex justify-center items-center flex-col gap-7">
      <h1 className="text-xl font-bold ">Something went wrong</h1>
      <h2>Error Message: {error.message}</h2>
      <div className="flex justify-center items-center gap-4">
        <button onClick={() => reset()} className="text-xl bg-purple-700 hover:bg-purple-900 w-max block text-center p-1 text-white rounded-lg">Try Again</button>
        <Link className="text-xl bg-purple-700 hover:bg-purple-900 w-max block text-center p-1 text-white rounded-lg" href={'../'}>Home Page</Link>
      </div>
    </div>
  )
}
