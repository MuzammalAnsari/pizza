"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation"
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const session = useSession();
    const [userName, setUserName] = useState('');
    const { status } = session;
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        setSaved(false)
        setIsSaving(true)
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: userName }),
        });
        setIsSaving(false)
        if (response.ok) {
            setSaved(true)
        }
    }
    async function handleFileChange(ev) {
        const files = ev.target.files
        if (files?.length) {
            const data = new FormData()
            data.set('file', files[0])
            await fetch('/api/upload', {
                method: 'POST',
                body: data,
                // headers: { 'Content-Type': 'multipart/form-data' },
            })
        }
    }

    if (status === 'loading') {
        return 'loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const userImage = session.data.user.image;

    return (
        <section className='mt-8'>
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            <div className='max-w-md mx-auto '>
                {saved && (
                    <h2 className="text-center bg-green-100 mb-2 p-4 rounded-lg border-4 border-green-300">
                        Profile Saved!
                    </h2>
                )}
                {isSaving && (
                    <h2 className="text-center bg-blue-100 mb-2 p-4 rounded-lg border-4 border-blue-300">
                        Saving...
                    </h2>
                )
                }
                <div className="flex gap-4 items-center">
                    <div className="p-2 rounded-lg">
                        <Image className="rounded-lg w-full h-full mb-1" src={userImage}
                            width={250} height={250} alt={'avatar'} />
                        <label >
                            <input type="file" className="hidden" onChange={handleFileChange} />
                            <span className="border rounded-lg p-2 block text-center">Edit</span>
                        </label>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last Name"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />
                        <input type="email" placeholder="First and Last Name" value={session.data.user.email} disabled />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
