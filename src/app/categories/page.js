
import UserTabs from "../../components/layout/userTabs";

export default function CategoriesPage() {
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <UserTabs isAdmin={true} />
            <h1>Category Page</h1>
        </section>
    )
}