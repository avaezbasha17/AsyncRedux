import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createUsers = createAsyncThunk(
    'users/createUsers',
    async (userInput, ThunkAPI) => {
        try {
            const processedData = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(userInput);
                }, 100);
            });

            return processedData;
        } catch (error) {
            return ThunkAPI.rejectWithValue(error.response?.data || 'Failed to create Users account');
        }
    }
);

export const loginUsers = createAsyncThunk(
    'users/fetchUsers',
    async (_, ThunkAPI) => {
        try {
            const user = ThunkAPI.getState()
            return user
        } catch (error) {
            return ThunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch Users account');
        }
    }
)

export const loginUsersAPI = createAsyncThunk('users/fetchUsersAPI', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch users');
    }
})


export const editUsersAPI = createAsyncThunk('users/editUsersAPI', async (obj, ThunkAPI) => {
    try {
        const user = ThunkAPI.getState()
        const usersAPI = user.reducer.loginUserAPI

        return usersAPI.map(ele => (ele.id === obj.id ? { ...ele, ...obj } : ele));
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response?.data || 'Failed to Edit Users details');
    }
})


export const deleteUsersAPI = createAsyncThunk('users/deleteUsersAPI', async (obj, ThunkAPI)=>{
    try {
        const user = ThunkAPI.getState()
        const userAPI = user.reducer.loginUserAPI

        return userAPI.filter(ele => ele.id !== obj.id);
    } catch (error) {
        return ThunkAPI.rejectWithValue(error.response?.data || 'Failed to Delete Users details');
    }
})