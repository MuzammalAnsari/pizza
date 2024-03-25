'use client'
import UserTabs from "../../components/layout/userTabs";
import { useProfile } from "../../components/layout/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export default function CategoriesPage() {

    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([]);
    const { loading: profileLoading, data: profileData } = useProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories()
    }, [])

    function fetchCategories() {
        fetch('/api/categories').then(response => {
            response.json().then(categories => {
                setCategories(categories)
            })
        })
    }
    async function handleCategorySubmit(event) {
        event.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {

            const data = { name: categoryName }
            if (editedCategory) {
                data._id = editedCategory._id;

            }

            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            setCategoryName('')
            fetchCategories()
            setEditedCategory(null)
            if (response.ok) {
                resolve()
            }
            else {
                reject()
            }
        })
        await toast.promise(creationPromise, {
            loading: editedCategory
                ? 'Updating category...'
                : 'Creating category...',
            success: editedCategory
                ? 'Category updated!'
                : 'Category created!',
            error: 'Could not create category.',
        })

    }



    if (profileLoading) {
        return "Loading user info...";
    }

    if (!profileData.admin) {
        // redirect('/');
        return <div className="text-center text-2xl text-red-500">Unauthorized</div>;
    }
    return (
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />

            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update Category' : ' New Category Name'}
                            {editedCategory && (
                                <b> : {editedCategory.name}</b>
                            )}
                        </label>
                        <input type="text"
                            value={categoryName}
                            onChange={ev => setCategoryName(ev.target.value)}
                        />
                    </div>
                    <div className="pb-2">
                        <button type="submit" >
                            {
                                editedCategory ? 'Update' : 'Create'
                            }
                        </button>
                    </div>
                </div>
            </form>

            <div className="mt-8">
                <h2 className="text-sm text-gray-500">Edit Category:</h2>
                {
                    categories?.length > 0 && categories.map(category =>
                        <button
                            onClick={() => {
                                setEditedCategory(category);
                                setCategoryName(category.name);
                            }}
                            className="bg-gray-300 rounded-xl p-2
                            cursor-pointer mb-1 flex gap-1"
                        >
                            <span className="flex"> {category.name}</span>
                        </button>
                    )
                }
            </div>
        </section>
    )
}