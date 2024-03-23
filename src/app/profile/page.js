"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const session = useSession();
    console.log(session);
    const [userName, setUserName] = useState('');
    const { status } = session;
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    let [city, setCity] = useState('');
    let [country, setCountry] = useState('');


    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            fetch('/api/profile')
                .then((res) => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    }, [session, status]);

    async function handleProfileInfoUpdate(ev) {
        ev.preventDefault();
        // toast.loading('Saving...')
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName,
                phone,
                streetAddress,
                postalCode,
                city,
                country,
            }),
        });
        if (response.ok) {
            toast.success('Profile Saved!')
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
                <div className="flex gap-4 ">
                    <div className="p-2 rounded-lg">
                        <Image className="rounded-lg w-full  mb-1" src={userImage}
                            width={250} height={250} alt={'avatar'} objectFit="cover" />
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <input type="text" placeholder="First and Last Name"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />
                        <input type="email" placeholder="First and Last Name" value={session.data.user.email} disabled />
                        <input type="tel" placeholder="Phone Number"
                            value={phone} onChange={ev => setPhone(ev.target.value)
                            } />
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <div className="flex gap-4">
                            <input type="text" placeholder="Postal Code"
                                value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                            />
                            <input type="text" placeholder="City"
                                value={city} onChange={ev => setCity(ev.target.value)}
                            />
                        </div>
                        <input type="text" placeholder="Country"
                            value={country} onChange={ev => setCountry(ev.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
