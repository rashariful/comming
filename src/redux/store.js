import brandReducer from "./api/brand/brandSlice";
import { brand } from "./api/brand/brandApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    brand: brandReducer,

    [brand.reducerPath]: brand.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(brand.middleware),
});

export default store;
