export interface ClientEditRequest{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    isVip: boolean;
    satisfactionScore: number;
    profilePicture: string | null;

}