export interface TicketFormData {
      title: string;
  description: string;
  status: string;
  priority: string;
  issueType: string;
  categoryId: string;
  clientId: string;
  assignedToId: string;
  attachmentIds?: number[];
}