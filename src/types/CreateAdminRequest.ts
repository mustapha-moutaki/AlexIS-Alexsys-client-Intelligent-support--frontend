export interface CreateAdminRequest{
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    phoneNumber:string,
    profilePicture:string | null,
    role: string
}