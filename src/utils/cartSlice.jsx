import { createSlice } from "@reduxjs/toolkit";
//cart slice
export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],//products in cart  
        total:0,//no. of items in cart
    },
    reducers:{
        //to add items in cart
        increaseItems:(state,action)=>{
           const newitem=action.payload;
           const existitem=state.items.find((item)=>item.id==newitem.id); 
           state.total++;
           //if exists then increase quantity else add total item with quantity 1
           if(existitem)
                existitem.quantity++;
            else
                state.items.push({...newitem,quantity:1});
        },
        //to remove product from cart
        removeItems:(state,action)=>{
            const remitem=action.payload;
            state.total-=remitem.quantity;//minus its quantity from total
            state.items=state.items.filter((item)=>item.id!=remitem.id);
        },
        //to decrease item quantity by 1 if 0 then remove from cart
        decreaseItem:(state,action)=>{
            const decitem=action.payload;
            const existitem=state.items.find((item)=>item.id==decitem.id); 
            state.total--;
            //quantity more than one then minus its original quantity value
            if(existitem && existitem.quantity>1)
                existitem.quantity--;
            //remove if its 0 after minus 1 in quantity 
            else if(existitem&&existitem.quantity==1){
                state.items= state.items.filter((item)=>item.id!=decitem.id)
            }
        },
        //remove all products in cart
        clearCart:(state,action)=>{
            state.total=0;
            state.items=[];
        }
    },
})

export const {increaseItems,decreaseItem, removeItems, clearCart}=cartSlice.actions
export default cartSlice.reducer;