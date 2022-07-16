import {createAsyncThunk} from "@reduxjs/toolkit";
import TagService from "../../../services/tag-service";

export const fetchTags = createAsyncThunk('tags/fetchTags', async(args, thunkAPI) => {
    try{
        const response = await TagService.getTags()
        return response.data
    }catch(e){
        return thunkAPI.rejectWithValue(e)
    }
})