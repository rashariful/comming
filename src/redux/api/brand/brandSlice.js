import { createSlice } from "@reduxjs/toolkit";

const brand = createSlice({
  name: 'brand',
  initialState: {
    brand: null,
  },
 
});

// export const { setUser } = orderSlice.actions;
export default brand.reducer;
