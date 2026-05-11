export interface AgentEditRequest{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    active: boolean;
    deleted: boolean;

    specialization: string;
    averageResolutionTime: number;
    performanceRating: number;
    availabilityStatus: string;     
    level: string;
}