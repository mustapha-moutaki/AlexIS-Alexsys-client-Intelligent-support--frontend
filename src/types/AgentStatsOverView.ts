export interface AgentStatsOverView {
    totalAgents: number,
    totalBusyAgents: number,
    totalAvailableAgents: number,
    overloadAgents: number,
    averageResolutionTime: number,
    averagePerformanceRating: number,
    bestAgent: string,
    avgLoadPerAgent: number,
    riskDetected: string | null
}