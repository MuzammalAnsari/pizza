"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/userTabs";
import EditableImage from "../../components/layout/EditableImage";

export default function ProfilePage() {
    const session = useSession();
    console.log(session);
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [profileFetched, setProfileFetched] = useState(false);

    const { status } = session;

    useEffect(() => {
        if (status === 'authenticated') {
            setUserName(session.data.user.name);
            setImage(session.data.user.image)
            fetch('/api/profile').then(response => {
                response.json().then(data => {
                    setPhone(data.phone);
                    setStreetAddress(data.streetAddress);
                    setPostalCode(data.postalCode);
                    setCity(data.city);
                    setCountry(data.country);
                    setIsAdmin(data.admin);
                    setProfileFetched(true)
                })
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

    if (status === 'loading' || !profileFetched) {
        return 'loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    // const userImage = session.data.user.image;

    return (
        <section className='mt-8'>
            <UserTabs isAdmin={isAdmin} />
            <div className='max-w-md mx-auto '>
                <div className="flex gap-4 ">
                    {/* <div className="p-2 rounded-lg">
                        <Image className="rounded-lg w-full mb-1 min-w-[90px]" src={userImage}
                            width={250} height={250} alt={'avatar'} objectFit="cover" />
                    </div> */}
                    <div>
                        <div className="p-2 rounded-lg relative max-w-[120px]">
                            <EditableImage link={image} setLink={setImage} />
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>

                        <label>First and Last Name:</label>
                        <input type="text" placeholder="First and Last Name"
                            value={userName}
                            onChange={ev => setUserName(ev.target.value)}
                        />

                        <label>Email:</label>
                        <input type="email" placeholder="Email" value={session.data.user.email} disabled />

                        <label>Phone:</label>
                        <input type="tel" placeholder="Phone Number"
                            value={phone} onChange={ev => setPhone(ev.target.value)
                            } />

                        <label>Address:</label>
                        <input type="text" placeholder="Street Address"
                            value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}
                        />
                        <div className="flex gap-4">
                            <div>
                                <label> Postal Code:</label>
                                <input type="text" placeholder="Postal Code"
                                    value={postalCode} onChange={ev => setPostalCode(ev.target.value)}
                                />
                            </div>
                            <div>
                                <label> City:</label>
                                <input type="text" placeholder="City"
                                    value={city} onChange={ev => setCity(ev.target.value)}
                                />
                            </div>
                        </div>
                        <label> Country:</label>
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
