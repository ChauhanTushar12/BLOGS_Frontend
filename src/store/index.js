import { configureStore } from "@reduxjs/toolkit";
import prodReducer from "./prodRoute.js"; 
import authReducer from "./authReducer.js";

const store = configureStore({
    reducer: {
        prod: prodReducer,
        auth: authReducer,
    },
});

export default store;