export interface CreateClientTicketPayload {
    title: string;
    description: string;
    categoryId: number;
    priority: string;
    issueType: string;
    attachmentIds?: number[];
    commentId?: number;
}