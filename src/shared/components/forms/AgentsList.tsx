"use client";

import React, { useState } from "react";
import { Eye, Pencil, Ban, Trash2, Star } from "lucide-react";
import { Agent } from "@/src/types/Agent";
import { useRouter } from "next/navigation";

interface AgentsListProps {
  agents: Agent[];
}

export default function AgentsList({ agents = [] }: AgentsListProps) {
    const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  // Selection Logic
  const toggleAll = () => {
    if (selected.length === agents.length) {
      setSelected([]);
    } else {
      setSelected(agents.map((a) => a.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Helper for Status Dot Colors
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "AVAILABLE": return "bg-emerald-500";
      case "BUSY": return "bg-amber-500";
      case "OFFLINE": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="flex-1 min-h-0 overflow-auto bg-white rounded-xl border border-gray-200 shadow-sm mt-4">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-gray-50/50 border-b border-gray-100 sticky top-0 z-10">
            <th className="w-[48px] py-3 pl-5 text-left bg-gray-50/50">
              <input
                type="checkbox"
                checked={agents.length > 0 && selected.length === agents.length}
                onChange={toggleAll}
                className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
              />
            </th>
            <th className="w-[28%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Agent</th>
            <th className="w-[18%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Specialization</th>
            <th className="w-[12%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
            <th className="w-[12%] py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="py-3 text-left text-[12px] font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="w-[160px] py-3 pr-5 text-right bg-gray-50/50"></th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {agents.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center text-sm text-gray-400">
                No agents found.
              </td>
            </tr>
          ) : (
            agents.map((agent) => (
              <tr key={agent.id} className="transition-colors hover:bg-indigo-50/20 group">
                <td className="py-4 pl-5">
                  <input
                    type="checkbox"
                    checked={selected.includes(agent.id)}
                    onChange={() => toggleSelect(agent.id)}
                    className="w-4 h-4 accent-indigo-600 cursor-pointer rounded"
                  />
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Logic */}
                    {agent.profilePicture ? (
                      <img 
                        src={agent.profilePicture} 
                        alt={agent.firstName} 
                        className="w-8 h-8 rounded-full object-cover border border-gray-100"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[11px] font-bold">
                        {agent.firstName?.charAt(0)}{agent.lastName?.charAt(0)}
                      </div>
                    )}
                    
                    <div className="min-w-0 truncate">
                      <div className="text-[13px] font-semibold text-gray-900 truncate">
                        {agent.firstName} {agent.lastName}
                      </div>
                      <div className="text-[11px] text-gray-500">@{agent.username}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-[13px] text-gray-700 font-medium truncate">
                      {agent.specialization}
                    </span>
                    <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-tight">
                      {agent.level}
                    </span>
                  </div>
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-[13px] font-bold text-gray-700">
                      {agent.performanceRating || "0.0"}
                    </span>
                  </div>
                </td>

                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.availabilityStatus)}`} />
                    <span className="text-[12px] text-gray-600 font-medium capitalize">
                      {agent.availabilityStatus?.toLowerCase() || "Unknown"}
                    </span>
                  </div>
                </td>

                <td className="py-4 text-[13px] text-gray-600 truncate">
                  {agent.phoneNumber || "—"}
                </td>

                <td className="py-4 pr-5">
                  <div className="flex justify-end items-center gap-1  group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 rounded-md text-gray-400 text-indigo-600 hover:bg-indigo-50" title="View Profile" onClick={()=> router.push(`/dashboard/users/${agent.id}`)}>
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-400 text-amber-600 hover:bg-amber-50" title="Edit" onClick={()=> router.push(`/dashboard/users/${agent.id}/edit`)}>
                      <Pencil size={16}
                      

                       />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-400 text-orange-600 hover:bg-orange-50" title="Block">
                      <Ban size={16} />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-400 text-red-600 hover:bg-red-50" title="Delete">
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
  );
}