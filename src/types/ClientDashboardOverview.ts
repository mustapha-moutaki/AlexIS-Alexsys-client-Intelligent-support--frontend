export interface ClientDashboardOverview {
    countMyClosedTickets: number;
    countMyOpenTickets: number;
    countMyResolvedTickets: number;
    countMyTotalTickets: number;
    myClosedTickets: number;
    myHighPriorityTickets: number;
    myLowPriorityTickets: number;
    myMediumPriorityTickets: number;
    ticketsNeedingAttention: number;
    registrationDate: string;
    countMyInProgressTickets: number;
}