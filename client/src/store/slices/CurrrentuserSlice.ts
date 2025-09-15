import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { userInterface } from "@/types/user";

type initialStateType = {
    data: userInterface
    loading: boolean
    state: boolean
    error: string
}
let initialState: initialStateType = {
    data: {
        _id: "",
        first_name: "",
        last_name: "",
        full_name:"",
        profile_image: "",
        email:"",
        platforms: [],
        createdAt: "",
        statistics: {
            views_count: 0,
            likes_count: 0,
            downloads_count: 0,
            highlights_count: 0,
            assets_count: 0,
            following_count: 0,
            followers_count: 0,
        },
    },
    loading: false,
    state: false,
    error: ''
}

export let getCurrentUser = createAsyncThunk('currentUser/getCurrentUser',
    async (_, thunkAPI) => {
        try {
            const res = await api.get('/users/me')

            if (res.statusText !== 'OK') {
                return thunkAPI.rejectWithValue('User not found')
            }

            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Network error')
        }

    })

let CurrrentuserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        updateCurrentUser: (state, action) => {
           state.data=action.payload
        },
        updateCurrentUserImage:(state, action)=>{
          state.data.profile_image=action.payload
        }

    },

    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false

        })
    }
})

export let {updateCurrentUserImage,updateCurrentUser}=CurrrentuserSlice.actions
export default CurrrentuserSlice.reducer