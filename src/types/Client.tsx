export interface Client{
    id:number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    phoneNumber: string,
    profilePicture: string,
    active: boolean,
    deleted: boolean,

    createdAt: string,
    updatedAt: string,

    createdBy: string,
    registrationDate: string,
    lastInteraction: string,
    isVip: boolean
}