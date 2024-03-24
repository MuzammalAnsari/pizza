'use client'
import UserTabs from "../../components/layout/userTabs";
import { useProfile } from "../../components/layout/useProfile";
export default function CategoriesPage() {

    const { loading: profileLoading, data: profileData } = useProfile();
    if (profileLoading) {
        return "Loading user info...";
    }

    if (!profileData.admin) {
        // redirect('/');
        return <div className="text-center text-2xl text-red-500">Unauthorized</div>;
    }
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <h1>Category Page</h1>
        </section>
    )
}