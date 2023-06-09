export interface TestAnswer {
    qIndex: number
    answer: number
    criteriaSlug: string
}

export interface ResultEntry {
    tool: any
    points: number
    accepted: boolean
}