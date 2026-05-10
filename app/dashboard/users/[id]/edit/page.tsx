"use client";

import { useParams } from "next/navigation";
import { useUserById } from "@/src/hooks/useUsers";
import { useAgentById } from "@/src/hooks/useAgent";
import { useClientById } from "@/src/hooks/useClient";
import AdminEditForm from "@/src/shared/components/edit-froms/AdminEditForm";
import AgentEditForm from "@/src/shared/components/edit-froms/AgentEditForm";
import ClientEditForm from "@/src/shared/components/edit-froms/ClientEditForm";
import SimpleSpinner from "@/components/ui/SimpleSpinner";

export default function UserEditPage() {
  const { id } = useParams();
  const { data: user, isLoading } = useUserById(id as string);

  
  if (isLoading) return <SimpleSpinner />;
  if (!user) return <div>User not found</div>;

  // 2. Simple logic: render a sub-component based on role
  if (user.role === "AGENT") return <AgentPage id={id as string} />;
  if (user.role === "CLIENT") return <ClientPage id={id as string} />;
  
  // Default for ADMIN
  return <AdminEditForm user={user} />;
}

// Small helper components to fetch specific data only when needed
function AgentPage({ id }: { id: string }) {
  const { data, isLoading } = useAgentById(id);
  if (isLoading) return <SimpleSpinner />;
  return <AgentEditForm user={data} />;
}

function ClientPage({ id }: { id: string }) {
  const { data, isLoading } = useClientById(id);
  if (isLoading) return <SimpleSpinner />;
  return <ClientEditForm user={data} />;
}