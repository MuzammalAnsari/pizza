'use client'

import Link from "next/link";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

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
                {user && (
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
                {!user && (
                    <>
                        <Link href={'/login'} className='px-8  py-2 '>Login</Link>
                        <Link href={'/register'} className='bg-primary rounded-full px-8 text-white py-2 '>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
