export interface MyTicketSummaryResponse {
     id:number;
     title:string;
     description:string;
     status:string;
     priority:string;
     issueType:string;
     categoryId:number; 
     clientId:number; 
     assignedToId:number; 

     ommentCount:number;
     ttachmentCount:number;
    
}