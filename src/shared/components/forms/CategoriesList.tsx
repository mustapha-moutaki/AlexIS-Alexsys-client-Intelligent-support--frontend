"use client";

import { Category } from "@/src/types/Category";
import React, { useState, useMemo } from "react";
import { Icon, PATHS } from "../modals/heelpers/ModalHelpers";
import CreateCategoryModal from "../modals/CreateCategoryModal";
import EditCategoryModal from "../modals/EditCategoryModal";
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from "@/src/hooks/useCategory";
import toast from "react-hot-toast";

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

export default function CategoriesList({ categories = [] }: { categories: Category[] }) {
  const [search, setSearch] = useState("");
  
  // Modal States
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);

  // Mutations
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  // 1. Logic: Filter
const filtered = useMemo(
  () =>
    (categories?.content || []).filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    ),
  [categories, search]
);
  // 2. Handlers
  const handleCreate = (data: any) => {
    createCategory(data, { 
      onSuccess: () => {
        toast.success("Category created!");
        setCreateOpen(false);
      }
    });
  };

  const handleUpdate = (formData: { id: string; name: string; description: string }) => {
  // We restructure the flat data from the modal into the { id, category } object the hook wants
  updateCategory({
    id: formData.id,
    category: { 
      name: formData.name, 
      description: formData.description 
    } as Category // Casting to Category or Partial<Category>
  }, {
    onSuccess: () => {
      setEditTarget(null); // Close the modal only on success
    }
  });
};

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    deleteCategory(id, { 
      onSuccess: () => toast.success("Category deleted")
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Controls */}
      <div className="flex justify-between items-center">
        <p className="text-xs text-gray-400">{filtered.length} Results</p>
        <button onClick={() => setCreateOpen(true)} className="px-3 h-8 bg-blue-600 text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-all active:scale-95">
          <Icon d={PATHS.plus} className="w-3.5 h-3.5" /> New Category
        </button>
      </div>

      {/* Search & Table */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <input 
          className="w-full p-3 text-xs border-b outline-none bg-gray-50 focus:bg-white transition-colors"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        {(filtered || []).map((cat) => (
          <div key={cat.id} className="grid grid-cols-[60px_1fr_2fr_100px_80px] p-4 border-b items-center text-sm last:border-0 hover:bg-gray-50/50">
            <span className="text-gray-300 font-mono text-[10px]">#{cat.id}</span>
            <span className="font-bold text-gray-800">{cat.name}</span>
            <span className="text-gray-400 truncate text-xs">{cat.description}</span>
            <span className="text-gray-400 text-[10px]">{fmtDate(cat.createdAt)}</span>
            
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditTarget(cat)} title="Edit" className="text-gray-300 hover:text-blue-600 transition-colors">
                <Icon d={PATHS.edit} className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(cat.id.toString())} title="Delete" className="text-gray-300 hover:text-red-500 transition-colors">
                <Icon d={PATHS.trash} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODALS: Rendered as layers, not replacing the page */}
      <CreateCategoryModal 
        isOpen={createOpen} 
        isPending={isCreating}
        onClose={() => setCreateOpen(false)} 
        onSubmit={handleCreate} 
      />

      <EditCategoryModal
        isOpen={!!editTarget}
        category={editTarget}
        isPending={isUpdating}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate} // Pass the handler here
      />
    </div>
  );
}