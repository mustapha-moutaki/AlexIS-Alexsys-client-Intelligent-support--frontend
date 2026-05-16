export interface CommentResponse{
    id:number;
    content:string;
    authorName:string;
    createdAt:string;
    authorId?:number;
}