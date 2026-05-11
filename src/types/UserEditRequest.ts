export interface UserEditRequest{
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber: string;
    password?: string;
    profilePicture: File | null;
    role?: string;
}


