import {combineReducers} from '@reduxjs/toolkit'
import statusSlice from './statusSlice';
import categorySlice from './categorySlice';
import buyBasket from './buyBasket';
export default combineReducers({
    buyBasket: buyBasket,
    category: categorySlice,
    status: statusSlice,
})