import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <Link className="text-primary font-semibold text-2xl" href=""> ST PIZZA</Link>
            <nav className='flex gap-4 items-center text-gray-500 font-semibold'>
                <Link href={''}>Home</Link>
                <Link href={''}>Menu</Link>
                <Link href={''}>About</Link>
                <Link href={''}>Contact</Link>
                <Link href={''} className='bg-primary rounded-full px-8 text-white py-2 '>Login</Link>
            </nav>
        </header>
    )
}