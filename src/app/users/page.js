"use client";

import { useEffect, useState } from "react";
import { useProfile } from "../../components/layout/useProfile";
import UserTabs from "../../components/layout/userTabs";
import Link from "next/link";
import Loader from "../../components/loader/Loader";


export default function UserPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      console.log('Response:', response); 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const usersData = await response.json();
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

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
    <section className="max-w-2xl mt-8 mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => {
            return (
              <div
                key={user._id}
                className="bg-gray-300 rounded-lg gap-4 p-1 px-4 mb-2 mt-4 flex items-center"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                  <div className="text-gray-900">
                    {!!user.name && <span className="">{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <span className="text-gray-500">{user.email}</span>
                </div>
                <div className="flex gap-4">
                  <Link href={'/users/'+user._id} className="text-blue-500 button">Edit</Link>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
