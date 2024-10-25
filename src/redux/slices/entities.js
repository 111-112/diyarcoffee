import {combineReducers} from '@reduxjs/toolkit'
import statusSlice from './statusSlice';
import categorySlice from './categorySlice';
import buyBasket from './buyBasket';
export default combineReducers({
    category: categorySlice,
    status: statusSlice,
    buyBasket: buyBasket,
})