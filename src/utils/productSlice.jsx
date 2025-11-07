import { createSlice } from "@reduxjs/toolkit";
//product lice
const productSlice=createSlice({
    name:"product",
    initialState:{
        products:[], //initially products nill  
        filteredProducts:[],
        searchQuery:"",//searchtext variable
    },
    reducers: {
      //add products into products 
    addProduct: (state, action) => {
      state.products = action.payload.map((ele) => ({
        ...ele,
        quantity: 0,
      }));
      state.filteredProducts = state.products; // initialize filtered
    },
    //search text add in variable and filter products based on it
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
       if (!action.payload.trim()) {
    state.filteredProducts = state.products;
    return;
  }
      state.filteredProducts = state.products.filter((item) => {
  const searchText = action.payload.toLowerCase();
  return (
    item.title.toLowerCase().includes(searchText) ||
    item.brand?.toLowerCase().includes(searchText) ||
    item.category?.toLowerCase().includes(searchText)
  );
});
    },
    //clear search
    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredProducts = state.products;
    },
  },
});

export const { addProduct, setSearchQuery, clearSearch } = productSlice.actions;
export default productSlice.reducer;