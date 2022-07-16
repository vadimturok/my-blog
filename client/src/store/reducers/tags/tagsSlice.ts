import {ITag} from "../../../types/tag-type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTags} from "./actionCreators";

interface TagsState{
    tags: ITag[];
    error: string;
}

const initialState: TagsState = {
    tags: [],
    error: '',
}

export const tagsSlice = createSlice({
    name: 'tags',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchTags.fulfilled.type]: (state: TagsState, action: PayloadAction<ITag[]>) => {
            state.error = ''
            state.tags = action.payload
        },
        [fetchTags.rejected.type]: (state: TagsState, action) => {
            state.error = 'Unable to fetch tags'
        }
    }
})

export default tagsSlice.reducer