"use client";
import UserTabs from "../../components/layout/userTabs";
import { useProfile } from "../../components/layout/useProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";
import Loader from "../../components/loader/Loader";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  async function handleCategorySubmit(event) {
    event.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }

      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    await toast.promise(creationPromise, {
      loading: editedCategory ? "Updating category..." : "Creating category...",
      success: editedCategory ? "Category updated!" : "Category created!",
      error: "Could not create category.",
    });
  }

  //handle Delete
  async function handleDeleteCategory(_id) {
    // console.log(_id);

    const deletionPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(deletionPromise, {
      loading: "Deleting category...",
      success: "Category deleted!",
      error: "Could not delete category.",
    });
    fetchCategories();
  }

  if (profileLoading) {
    return (
      <div className="text-center" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <Loader />
      </div>
    )
  }

  if (!profileData.admin) {
    // redirect('/');
    return (
      <div className="text-center text-2xl text-red-500">Unauthorized</div>
    );
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category" : " New Category Name"}
              {editedCategory && <b> : {editedCategory.name}</b>}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <h2 className="text-sm text-gray-500">Existing Category:</h2>
        {categories?.length > 0 &&
          categories.map((category) => (
            <div
              key={category._id}
              className="rounded-xl p-2 bg-gray-100 mb-1 flex gap-1 items-center"
            >
              <div className="grow">{category.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(category);
                    setCategoryName(category.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label="Delete"
                  onDelete={() => handleDeleteCategory(category._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
