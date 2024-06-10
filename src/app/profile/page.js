'use client'


import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/userTabs";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      }),
    });

    if (response.ok) {
      toast.success('Profile Saved!');
    }
  }

  if (status === 'loading' || !profileFetched) {
    return 'loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className='mt-8'>
      <UserTabs />
      <div className='max-w-md mx-auto'>
        <form onSubmit={handleProfileInfoUpdate}>
          <label>Phone:</label>
          <input type="tel" placeholder="Phone Number"
            value={phone}
            onChange={ev => setPhone(ev.target.value)}
          />

          <label>Address:</label>
          <input type="text" placeholder="Street Address"
            value={streetAddress}
            onChange={ev => setStreetAddress(ev.target.value)}
          />
          <div className="flex gap-4">
            <div>
              <label> Postal Code:</label>
              <input type="text" placeholder="Postal Code"
                value={postalCode}
                onChange={ev => setPostalCode(ev.target.value)}
              />
            </div>
            <div>
              <label> City:</label>
              <input type="text" placeholder="City"
                value={city}
                onChange={ev => setCity(ev.target.value)}
              />
            </div>
          </div>
          <label> country:</label>
          <input type="text" placeholder="Country"
            value={country}
            onChange={ev => setCountry(ev.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </section>
  );
}
