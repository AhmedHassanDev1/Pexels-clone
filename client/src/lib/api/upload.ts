import api from ".";

export async function uploadMedia(formData: FormData) {
    try {
        const response = await api.post("/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading media:", error);
        throw error;
    }
}
export async function submitMediaDetails(
    media_id: string,
    details?: {
        title?: string;
        tags?: string[];
        location?: string;
        
    }
) {
       
        
    try {
        const response = await api.put("/uploads/publish/"+media_id,{
             title:'',
             tags:[],
             location:''
        });

        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error("Error submitting media details:", error);
        throw error;
    }
}