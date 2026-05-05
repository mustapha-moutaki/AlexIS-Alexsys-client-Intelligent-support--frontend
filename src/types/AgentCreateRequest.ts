export interface AgentCreateRequest{
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    
    profilePicture: string;
    specialization: string;
    averageResolutionTime: number;
    performanceRating: number;
    availabilityStatus: string;
    level: string;
}