import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[],
        filteredProducts:[],
        searchQuery:"",
    },
    reducers: {
    addProduct: (state, action) => {
      state.products = action.payload.map((ele) => ({
        ...ele,
        cartQuantity: 0,
      }));
      state.filteredProducts = state.products; // initialize filtered
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredProducts = state.products.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
  },
});

export const { addProduct, setSearchQuery, clearSearch } = productSlice.actions;
export default productSlice.reducer;