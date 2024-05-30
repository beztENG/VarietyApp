import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './redux/cartSlice'
import shopSlice from './redux/shopSlice'



export const store = configureStore({
  reducer: {
    cart: cartSlice,
    shop: shopSlice,

  },
})