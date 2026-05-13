import { Category } from "./Category"
import { CommentResponse } from "./CommentResponse"
import { AttachmentResponse } from "./AttachmentResponse";


export interface TicketDetailsResponse{
    id:number
    title:string
    description:string
    status:string
    priority:string
    issueType:string
    category: Category
    clientName:string;
    assignedToName:string;

    comments: CommentResponse[];
    attachments: AttachmentResponse[];

     assignedAt:string;
     resolvedAt:string;
     closedAt:string;


}