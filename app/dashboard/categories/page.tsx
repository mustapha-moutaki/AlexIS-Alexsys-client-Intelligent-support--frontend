"use client";

import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import CategoriesList from "@/src/shared/components/forms/CategoriesList";
import { useCategories } from "@/src/hooks/useCategory";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";

export default function CategoriesPage() {
    const { data: categories, isLoading, isError, error } = useCategories();

    if (isLoading) {
        return (
            <main className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <ButtonGoBack />
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Categories</h1>
                </div>
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <ButtonGoBack />
                    <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Error</h1>
                </div>
                <div className="bg-red-50 p-4 rounded-lg text-red-600 text-sm">
                    {error?.message || "Failed to load categories"}
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
             <Breadcrumbs
                       items={[
                         { name: "Dashboard", route: "/" },
                         { name: "categories", route: "/dashboard/categories" },
                       ]}
                     />
            <div className="flex items-center justify-between">
               
                <div className="flex items-center gap-4">
                    <ButtonGoBack />
                    <div>
                        <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Categories</h1>
                        <p className="text-xs text-gray-400">Manage ticket classifications and support topics</p>
                    </div>
                </div>
            </div>
            {/* Pass categories with a fallback to empty array */}
            <CategoriesList categories={categories || []} />
        </main>
    );
}