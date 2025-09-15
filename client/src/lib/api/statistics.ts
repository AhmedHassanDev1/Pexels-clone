import api from "."

export let getStatisticsViews=(userId:string)=>{
    return api.get(`/statistics/${userId}/views`)
} 

export let getStatisticsLikes=(userId:string)=>{
    return api.get(`/statistics/${userId}/views`)
} 

export let getStatisticsDownloads=(userId:string)=>{
    return api.get(`/statistics/${userId}/views`)
} 

export let getStatisticsFollowers=(userId:string)=>{
    return api.get(`/statistics/${userId}/views`)
} 

