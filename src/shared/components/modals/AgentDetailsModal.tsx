import { useAgentById } from "@/src/hooks/useAgent";
import { X } from "lucide-react";
import { Field } from "./heelpers/ModalHelpers";
import SimpleSpinner from "@/components/ui/SimpleSpinner";

export default function AgentDetailsModal({
  agentId,
  onClose,
}: {
  agentId: string;
  onClose: () => void;
}) {
  const { data: agent, isPending } = useAgentById(agentId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            Agent Details
          </h3>

          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6">
          {isPending ? (
            <div className="flex items-center justify-center">
              <SimpleSpinner/>
            </div>
          ) : !agent ? (
            <p className="text-red-500 text-sm">Agent not found</p>
          ) : (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="">
                <img className="rounded-full w-20 h-20" src={agent.profilePicture} alt="" />
              </div>
              
              <Field label="Full Name" value={`${agent.firstName} ${agent.lastName}`} />
              <Field label="Username" value={agent.username} />
              <Field label="Email" value={agent.email} />
              <Field label="Phone" value={agent.phoneNumber} />

              <Field label="Specialization" value={agent.specialization} />
              <Field label="Level" value={agent.level} />
              <Field label="Availability" value={agent.availabilityStatus} />

              <Field label="Performance" value={`${agent.performanceRating}/5`} />
              <Field label="Avg Resolution" value={agent.averageResolutionTime} />

              <Field
                label="Active"
                value={agent.active ? "Yes" : "No"}
              />

              <Field
                label="Deleted"
                value={agent.deleted ? "Yes" : "No"}
              />

            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}