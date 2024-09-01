"use client";

import { useEffect, useState } from "react";
import { useProfile } from "../../components/layout/useProfile";
import UserTabs from "../../components/layout/userTabs";
import Link from "next/link";

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Loading user info...";
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
                    {!user.name && <span className="italic ps-4">No name</span>}
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
