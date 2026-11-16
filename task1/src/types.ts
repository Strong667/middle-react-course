export type Category = 'frontend' | 'fullstack' | 'quality'

export interface Course {
    id: string
    title: string
    category: Category
    seats: number
    version: number
}
