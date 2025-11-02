import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        total:0,
    },
    reducers:{
        increaseItems:(state,action)=>{
           const newitem=action.payload;
           const existitem=state.items.find((item)=>item.id==newitem.id); 
           state.total++;
           if(existitem)
                existitem.quantity++;
            else
                state.items.push({...newitem,quantity:1});
        },
        removeItems:(state,action)=>{
            const remitem=action.payload;
            state.total-=remitem.quantity;
            state.items=state.items.filter((item)=>item.id!=remitem.id);
        },
        decreaseItem:(state,action)=>{
            const decitem=action.payload;
            const existitem=state.items.find((item)=>item.id==decitem.id); 
            state.total--;
            if(existitem && existitem.quantity>1)
                existitem.quantity--;
            else if(existitem&&existitem.quantity==1){
                state.items= state.items.filter((item)=>item.id!=decitem.id)
            }
        },
        clearCart:(state,action)=>{
            state.total=0;
            state.items=[];
        }
    },
})

export const {increaseItems,decreaseItem, removeItems, clearCart}=cartSlice.actions
export default cartSlice.reducer;