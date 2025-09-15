
export type DetailsType = {
    width: number
    height: number
    orientation: string
}

export interface mediaInterface {
    _id: string
    user: string
    type: 'image' | 'video'
    url: string
    tags: string[]
    title: string
    location: string
    status: 'processing' | 'draft' | 'published'
    likes: number
    downloads: number
    views: number
    details: DetailsType
    primary_color: string
    colors: string[]
    createdAt: string
    is_like:boolean
}