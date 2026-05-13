export interface TicketResponse {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED" | "PENDING";
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  issueType: "BUG" | "FEATURE" | "QUESTION" | "INCIDENT" | "SUGGESTION";
  categoryId: number;
  clientId: number;
  assignedToId: number;
  commentCount: number;
  attachmentCount: number;
}