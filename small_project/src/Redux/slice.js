import { createSlice } from "@reduxjs/toolkit";
import { createUsers, deleteUsersAPI, editUsersAPI, loginUsers, loginUsersAPI } from "./action";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: 'idle',
        error: null,
        fetchStatus: 'idle',
        loginUser: [],
        loginUserAPI: [],
        editStatus: 'idle',
        editUserAPI: [],
        deleteStatus: 'idle',
    },
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(createUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users.push(action.payload);
            })
            .addCase(createUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(loginUsers.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(loginUsers.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                state.loginUser = action.payload
            })
            .addCase(loginUsers.rejected, (state, action) => {
                state.fetchStatus = "error";
                state.error = action.payload
            })
            .addCase(loginUsersAPI.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(loginUsersAPI.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                state.loginUserAPI = (action.payload)
            })
            .addCase(loginUsersAPI.rejected, (state, action) => {
                state.fetchStatus = "error";
                state.error = action.payload
            })
            .addCase(editUsersAPI.pending, (state) => {
                state.editStatus = "pending"
            })
            .addCase(editUsersAPI.fulfilled, (state, action) => {
                state.editStatus = "succeeded";
                state.loginUserAPI = (action.payload);
            })
            .addCase(editUsersAPI.rejected, (state, action) => {
                state.editStatus = "rejected";
                state.error = action.payload;
            })
            .addCase(deleteUsersAPI.pending, (state) => {
                state.deleteStatus = "pending"
            })
            .addCase(deleteUsersAPI.fulfilled, (state,action)=>{
                state.deleteStatus = "succeeded";
                state.loginUserAPI = (action.payload);
            })
            .addCase(deleteUsersAPI.rejected, (state,action)=>{
                state.deleteStatus = "rejected";
                state.error = action.payload
            })
    },
});

export default usersSlice.reducer;