'use client'
import UserTabs from "../../components/layout/userTabs";
import { useProfile } from "../../components/layout/useProfile";


export default function MenuItemsPage() {

    const { loading, data } = useProfile();

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an Admin'
    }
    return (
        <section>
            <UserTabs isAdmin={true} />
            <form className="mt-8 max-w-md mx-auto">
                <div className="flex items-start gap-4">
                    <div>
                        image
                    </div>
                    <div className="grow ">
                        <label>Item name</label>
                        <input type="text" />

                        <label>Description</label>
                        <input type="text" />

                        <label>Base Price</label>
                        <input type="text" />
                        <button type="submit">Save</button>
                    </div>
                </div>
            </form>
        </section>
    )
}