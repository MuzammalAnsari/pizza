'use client'
import { useEffect, useState } from "react";
import UserTabs from "../../components/layout/userTabs";

export default function CategoriesPage() {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        fetch('/api/profile').then(response => {
            response.json().then(data => {
                // console.log(data);
                setIsAdmin(data.admin)
            })
        })
    }, []);

    if (!isAdmin) {
        return 'not a admin '
    }


    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <h1>Category Page</h1>
        </section>
    )
}