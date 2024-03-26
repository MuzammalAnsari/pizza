'use client'
import UserTabs from "../../components/layout/userTabs";
import { useProfile } from "../../components/layout/useProfile";
import EditableImage from "../../components/layout/EditableImage";
import { useState } from "react";


export default function MenuItemsPage() {
    const [image, setImage] = useState('');
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
                <div className="flex items-start gap-4"
                    style={{ gridTemplateColumns: '.3fr .7fr' }}>
                    <div>
                        <EditableImage link={image} setLink={setImage} />
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