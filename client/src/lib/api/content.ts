import api from ".";


export async function getMediaById(id: string) {
    return await api.get(`/content/${id}`)
}

export async function getHighlights({ pageParam = 1, queryParams }: any) {
    let {  limit } = queryParams
      return await api.get(`/content/highlights`, {
        params: { limit, page: pageParam }
    })
}

export async function getUserGallery({ pageParam = 1, queryParams }: any) {

    let { userId, limit } = queryParams

    return await api.get(`/content/${userId}/gallery`, {
        params: { limit, page: pageParam }
    })
}


export async function gethomeContent({ pageParam = 1, queryParams }: any) {

    let {  limit, type } = queryParams
    console.log();
      
    return await api.get(`/content/home`, {
        params: { limit, page: pageParam  }
    })
}

export async function gethomeVideos({ pageParam = 1, queryParams }: any) {
    let {  limit  } = queryParams
    return await api.get(`/content/videos`, {
        params: { limit, page: pageParam  }
    })
}
