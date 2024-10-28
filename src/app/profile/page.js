"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/userTabs";
import UserForm from "../../components/layout/UserForm";
import Loader from "../../components/loader/Loader";

export default function ProfilePage() {
    const session = useSession();
    
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setUser(data)
                    setIsAdmin(data.admin);
                    setProfileFetched(true)
                })
            })

        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev, data) {
        ev.preventDefault();
        // toast.loading('Saving...')
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            toast.success('Profile Saved!')
        }
    }

    if (status === 'loading' || !profileFetched) {
        return (
            <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
              <Loader />
            </div>
          )
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const userImage = session.data.user.image;

    return (
        <section className='mt-8'>
            <UserTabs isAdmin={isAdmin} />
            <div className='max-w-2xl mx-auto '>
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </section>
    );
}
