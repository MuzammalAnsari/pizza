'use client'

import UserTabs from "../../../components/layout/userTabs";
import { useProfile } from "../../../components/layout/useProfile";
import UserForm from "../../../components/layout/UserForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast';
import Loader from "../../../components/loader/Loader";

function EditUserPage() {
    const { loading, data } = useProfile();
    const [user, setUser] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch('/api/profile?_id='+id).then(res => {
          res.json().then(user => {
            setUser(user);
          });
        })
      }, []);


    async function handleSaveButtonClick(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
          const res = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({...data,_id:id}),
          });
          if (res.ok)
            resolve();
          else
            reject();
        });
    
        await toast.promise(promise, {
          loading: 'Saving user...',
          success: 'User saved',
          error: 'An error has occurred while saving the user',
        });
      }

    if (loading) {
      return (
        <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
          <Loader />
        </div>
      )
    }

    if (!data.admin) {
        return "Not an Admin";
    }

    return (
        <section className='mt-8 mx-auto max-w-2xl'>
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <h2 className='text-sm text-gray-500 mt-8'>Edit User:</h2>
                <UserForm user={user} onSave={handleSaveButtonClick} />
            </div>
        </section>
    );
}

export default EditUserPage;
