import { editeUserType, userInterface } from "@/types/user"
import api from "./index"


export let getUserById = async (id: string): Promise<{ data: userInterface }> => {
     return api.get(`/users/details/${id}`)
}
export let getUserStatistics=async(userId:string)=>{
      return api.get(`/users/statistics/${userId}`)
}

export let updateProfileImage = async (data: FormData) => {
     return api.put('/users/change_image', data, {
          headers: {
               "Content-Type": "multipart/form-data"
          }
     })
}

export let editeProfile = async (data: editeUserType) => {
     return api.put('/users/edite', data)
}

export let Follow = async (userId: string) => {
     return api.post(`/users/follow${userId}`)
}

export let unFollow = async (userId: string) => {
     return api.post(`/users/unfollow${userId}`)
}