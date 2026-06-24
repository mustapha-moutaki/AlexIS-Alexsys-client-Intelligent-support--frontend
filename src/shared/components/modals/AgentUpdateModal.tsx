import { X } from "lucide-react";
import { useState } from "react";

export default function AgentUpdateModal({
  currentAssignedToId,
  onClose,
  onConfirm,
  isLoading,
  agents
}: any) {
  const [selectedAgent, setSelectedAgent] = useState(currentAssignedToId);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between">
          <h2 className="font-bold text-slate-800">Reassign Agent</h2>
          <button onClick={onClose}><X /></button>
        </div>

        <div className="p-6 space-y-2">
          {agents.length > 0 ? agents?.map((agent:any) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`w-full px-4 py-3 rounded-xl border ${
                selectedAgent === agent.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200"
              }`}
            >
              {agent.firstName + " " + agent.lastName}
            </button>
          )):(
            <p className="text-center text-gray-500">No agents available</p>
          )
        }
        </div>

        {/* FOOTER */}
        <div className="p-6 flex gap-3 bg-slate-50">
          <button onClick={onClose} className="flex-1 border px-4 py-2 rounded-xl">
            Cancel
          </button>

          <button
            onClick={() => onConfirm(selectedAgent)}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
}