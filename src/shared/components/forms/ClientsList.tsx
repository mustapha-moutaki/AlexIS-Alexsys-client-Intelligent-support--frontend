"use client";

import React, { useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Crown, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Client } from "@/src/types/Client";
import { useRouter } from "next/navigation";

interface ClientsListProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  // Filter Props
  filters: { isVip?: boolean; isActive?: boolean };
  onFilterChange: (newFilters: { isVip?: boolean; isActive?: boolean }) => void;
  onDelete: (id: string) => void;
}

export default function ClientsList({
  clients = [],
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
  filters,
  onFilterChange,
  onDelete
}: ClientsListProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const router = useRouter();

  const toggleAll = () => {
    if (selected.length === clients.length) {
      setSelected([]);
    } else {
      setSelected(clients.map((c) => c.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full mt-4 gap-4">
      {/* FILTER BAR */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <Filter size={14} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase">Filters</span>
          </div>
          
          {/* VIP Toggle */}
          <select 
            className="text-xs font-medium border-none bg-transparent focus:ring-0 cursor-pointer text-gray-600"
            value={filters.isVip === undefined ? "" : String(filters.isVip)}
            onChange={(e) => onFilterChange({ ...filters, isVip: e.target.value === "" ? undefined : e.target.value === "true" })}
          >
            <option value="">All Types</option>
            <option value="true">VIP Clients</option>
            <option value="false">Standard</option>
          </select>

          {/* Active Toggle */}
          <select 
            className="text-xs font-medium border-none bg-transparent focus:ring-0 cursor-pointer text-gray-600"
            value={filters.isActive === undefined ? "" : String(filters.isActive)}
            onChange={(e) => onFilterChange({ ...filters, isActive: e.target.value === "" ? undefined : e.target.value === "true" })}
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div className="text-xs text-gray-400 font-medium">
          Total: {totalElements} Clients
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 min-h-0 overflow-auto bg-white rounded-t-xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 sticky top-0 z-10">
              <th className="w-[48px] py-3 pl-5 text-left bg-gray-50/50">
                <input
                  type="checkbox"
                  checked={clients.length > 0 && selected.length === clients.length}
                  onChange={toggleAll}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                />
              </th>
              <th className="w-[25%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Client</th>
              <th className="w-[12%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="w-[18%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
              <th className="w-[18%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Last Interaction</th>
              <th className="w-[10%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="w-[140px] py-3 pr-5 text-right bg-gray-50/50"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-sm text-gray-400">
                  No clients matching your criteria.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="transition-colors hover:bg-indigo-50/20 group">
                  <td className="py-4 pl-5">
                    <input
                      type="checkbox"
                      checked={selected.includes(client.id)}
                      onChange={() => toggleSelect(client.id)}
                      className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                    />
                  </td>

                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      {client.profilePicture ? (
                        <img src={client.profilePicture} alt="" className="w-8 h-8 rounded-full object-cover border border-gray-100" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[11px] font-bold">
                          {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
                        </div>
                      )}
                      <div className="min-w-0 truncate">
                        <div className="text-[13px] font-semibold text-gray-900 truncate">
                          {client.firstName} {client.lastName}
                        </div>
                        <div className="text-[11px] text-gray-500 truncate">{client.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">
                    {client.isVip ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-bold uppercase">
                        <Crown size={10} fill="currentColor" /> VIP
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-gray-400 uppercase ml-2">Standard</span>
                    )}
                  </td>

                  <td className="py-4 text-[12px] text-gray-600">
                    {client.registrationDate ? new Date(client.registrationDate).toLocaleDateString() : "—"}
                  </td>

                  <td className="py-4 text-[12px] text-gray-500 italic">
                    {client.lastInteraction ? new Date(client.lastInteraction).toLocaleDateString() : "Never"}
                  </td>

                  <td className="py-4">
                    {client.active ? (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                      <XCircle size={18} className="text-gray-300" />
                    )}
                  </td>

                  <td className="py-4 pr-5 text-right">
                    <div className="flex justify-end gap-1 ">
                      <button className="p-1.5 rounded-md text-gray-400 text-indigo-600 hover:bg-indigo-50" title="View" onClick={()=> router.push(`/dashboard/users/${client.id}`)}><Eye size={16} /></button>
                      <button className="p-1.5 rounded-md text-gray-400 text-amber-600 hover:bg-amber-50" title="Edit"onClick={()=> router.push(`/dashboard/users/${client.id}/edit`)}><Pencil size={16} /></button>
                      <button className="p-1.5 rounded-md text-gray-400 text-red-600 hover:bg-red-50" title="Delete" onClick={()=>onDelete(client.id.toString())}><Trash2 size={16} /></button>
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
          Page <span className="font-medium text-gray-700">{currentPage + 1}</span> of {totalPages}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}