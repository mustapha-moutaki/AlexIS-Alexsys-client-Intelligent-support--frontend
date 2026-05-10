"use client";

import React, { useState } from "react";
import { Eye, Pencil, Ban, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "@/src/types/User";
import { useRouter } from "next/navigation";

interface AdminsListProps {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
}

export default function AdminsList({ 
  users = [], 
  currentPage, 
  totalPages, 
  totalElements, 
  onPageChange 
}: AdminsListProps) {
  const [selected, setSelected] = useState<User["id"][]>([]);
 const router = useRouter();

  const toggleAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((u) => u.id));
    }
  };

  const toggleSelect = (id: User["id"]) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full mt-4">
      <div className="flex-1 min-h-0 overflow-auto bg-white rounded-t-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 sticky top-0 z-10">
              <th className="w-[48px] py-3 pl-5 text-left bg-gray-50/50">
                <input
                  type="checkbox"
                  checked={users.length > 0 && selected.length === users.length}
                  onChange={toggleAll}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                />
              </th>
              <th className="w-[30%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="w-[12%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="w-[20%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="w-[160px] py-3 pr-5 text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-sm text-gray-400">
                  No administrators found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-indigo-50/20 group">
                  <td className="py-4 pl-5">
                    <input
                      type="checkbox"
                      checked={selected.includes(user.id)}
                      onChange={() => toggleSelect(user.id)}
                      className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                    />
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {/* PROFILE PICTURE LOGIC */}
                      {user.profilePicture ? (
                        <img 
                          src={user.profilePicture} 
                          alt={user.firstName} 
                          className="w-8 h-8 rounded-full object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold">
                          {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                        </div>
                      )}
                      
                      <div className="min-w-0 truncate">
                        <div className="text-[13px] font-semibold text-gray-900 truncate">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-[11px] text-gray-500">@{user.username}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[12px] text-gray-600 font-medium">Active</span>
                    </div>
                  </td>

                  <td className="py-4 text-[13px] text-gray-600 truncate">
                    {user.phoneNumber || "—"}
                  </td>

                  <td className="py-4 text-[13px] text-gray-400 truncate">
                    {user.email}
                  </td>

                  <td className="py-4 pr-5">
  <div className="flex justify-end items-center gap-1">
    <button 
      className="p-1.5 rounded-md text-gray-500 text-indigo-600 hover:bg-indigo-50 transition-colors" 
      title="View Profile"
      onClick={()=> router.push(`/dashboard/users/${user.id}`)}
    >
      <Eye size={16} />
    </button>
    <button 
      className="p-1.5 rounded-md text-gray-500 text-amber-600 hover:bg-amber-50 transition-colors" 
      title="Edit"
       onClick={()=> router.push(`/dashboard/users/${user.id}/edit`)}
    >
      <Pencil size={16}
       />
    </button>
    <button 
      className="p-1.5 rounded-md text-gray-500 text-orange-600 hover:bg-orange-50 transition-colors" 
      title="Block"
     
    >
      <Ban size={16} />
    </button>
    <button 
      className="p-1.5 rounded-md text-gray-500 text-red-600 hover:bg-red-50 transition-colors" 
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="bg-white border-x border-b border-gray-200 rounded-b-xl px-5 py-3 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Showing <span className="font-medium text-gray-700">{users.length}</span> of{" "}
          <span className="font-medium text-gray-700">{totalElements}</span> users
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === i
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-indigo-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}