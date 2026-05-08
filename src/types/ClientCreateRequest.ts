export interface ClientCreateRequest{
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber:string,
    profilePicture?:File,
    
}