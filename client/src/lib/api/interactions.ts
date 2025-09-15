import api from "."


export let Like=(media_id:string)=>{
     return api.post(`/interactions/add-like/${media_id}`)
}

export let unLike=(media_id:string)=>{
     return api.post(`/interactions/remove-like/${media_id}`)
}