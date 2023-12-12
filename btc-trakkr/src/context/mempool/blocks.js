import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const getBlocks = createAsyncThunk('mempool/fetch-blocks', async (blocks, thunkAPI) => {

    console.log({mempoolBlocks: blocks});
});

const mempoolBlocksSlice = createSlice({
    name: 'mempool',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
});

export default mempoolBlocksSlice.reducer;