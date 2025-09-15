
export interface UserStatisticsType {
        views_count: number
        likes_count: number
        downloads_count: number
        highlights_count: number
        assets_count: number
        following_count: number
        followers_count: number
    }
export interface userInterface {
    _id: string
    first_name: string
    last_name: string
    full_name: string
    email: string
    bio?: string
    location?: string
    is_follow?:boolean 
    profile_image?:string | null

    platforms: {
        url: string
        platform: string
    }[]
    statistics: UserStatisticsType
    createdAt: string
}

export type editeUserType = {
    first_name: string
    last_name: string
    email: string
    bio?: string
    location?: string
    platforms?: {
        x: string
        tiktok: string
        youtube: string
        instagram: string
    } | {
        platform: string
        url: string
    }[]
}

