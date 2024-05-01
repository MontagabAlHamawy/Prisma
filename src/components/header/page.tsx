import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className='flex justify-between px-14 py-7 bg-slate-300 h-max items-center'>
        <div className='text-xl font-medium text-purple-600'>Logo</div>
        <div className='flex justify-between gap-4 items-center'>
            <Link href={'/'} className='text-lg font-medium text-gray-500'>Home</Link>
            <Link href={'/articles'} className='text-lg font-medium text-gray-500'>Articles</Link>
        </div>
    </div>
  )
}
