export interface TestAnswer {
    qIndex: number
    answer: number | Array<number>
    criteriaSlug: string
}

export interface ResultEntry {
    tool: any
    points: number
    accepted: boolean
    isRequested: Map<string, number>
    isProvided: Map<string, boolean>
}

export interface CriteriaEntry {
    slug: string
    name: string
    short: string
    type?: string
    options?: Array<any>
}

export interface CriteriaContent {
    body: Array<CriteriaEntry>
}

export interface ToolEntry {
    slug: string
    description: string
    rating: any
}
