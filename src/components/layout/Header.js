"use client"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react"

export default function Header() {
    const session = useSession()
    // console.log(session)
    const status = session.status
    const userData = session.data?.user
    let userName = userData?.name || userData?.email
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0]
    }
    return (
        <header className="flex items-center justify-between">
            <Link className="text-primary font-semibold text-2xl" href=""> ST PIZZA</Link>
            <nav className='flex gap-4 items-center text-gray-500 font-semibold'>
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
            </nav>
            <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
                {status === 'authenticated' && (
                    <>
                        <Link href={'/profile'}>Hello,
                            {userName}
                        </Link>
                        <button
                            onClick={() => signOut()}
                            href={'/register'} className='bg-primary rounded-full px-8 text-white py-2 '>
                            Logout
                        </button>
                    </>

                )}
                {status === 'unauthenticated' && (
                    <>
                        <Link href={'/login'} className='px-8  py-2 '>Login</Link>
                        <Link href={'/register'} className='bg-primary rounded-full px-8 text-white py-2 '>Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}