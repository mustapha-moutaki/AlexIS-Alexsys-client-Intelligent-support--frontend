"use client";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import { useClientGetTicketById } from "@/src/hooks/useTickets";
import TicketDetailsFrorClient from "@/src/shared/components/forms/ticket-forms/client/TicketDetailsFrorClient";
import { useParams } from "next/navigation";

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id;

  const { data, isLoading, isError, error } = useClientGetTicketById(Number(ticketId));

  if (isLoading) return <div className="flex justify-center items-center min-h-[400px]"><SimpleSpinner /></div>;
  if (isError || !data) return <div className="p-8 text-red-500">Error: {error?.message || "Ticket not found"}</div>;

  return (
    <TicketDetailsFrorClient ticket={data} />
  );
}