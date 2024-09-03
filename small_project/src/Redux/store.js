import { configureStore } from "@reduxjs/toolkit";
import slice from './slice'

const store = configureStore({
    reducer: {
        reducer:slice
    }
}) 

export default store