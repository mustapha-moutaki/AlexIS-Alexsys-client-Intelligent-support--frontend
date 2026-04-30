export interface AdminDashboardOverview {
  totalClients: number;
  totalClientsToDay: number;
  activeClients: number;

  avgSatisfactionScore: number;
  lowSatisfactionClient: number;

  totalAgents: number;
  totalAvailableAgents: number;
  totalBusyAgents: number;
  overloadAgents: number;

  averageResolutionTime: number;
  avgPerformanceRating: number;
  bestAgent: string | null;

  totalTickets: number;
  totalActiveTickets: number;
  totalResolvedTickets: number;
  totalClosedTickets: number;

  highPriorityTickets: number;
  totalTicketsToday: number;

  totalCategories: number;

  countMyTotalTickets: number;
  countMyOpenTickets: number;
  countMyInProgressTickets: number;
  countMyResolvedTickets: number;
  myClosedTickets: number;

  myTicketsCreatedToday: number;
  myHighPriorityTickets: number;
  myMediumPriorityTickets: number;
  myLowPriorityTickets: number;

  ticketsNeedingAttention: number;
  riskDetectedAgent: string | null;//
  avgLoadPerAgent: number;
};