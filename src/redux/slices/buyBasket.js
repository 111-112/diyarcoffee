import { createSlice, createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  value: [],
  basketBuyLength: 0,
  itemCounts: {},
  statusBasket: true,
};

const buyBasket = createSlice({
  name: "buyBasket",
  initialState,
  reducers: {
    BASKET_ADDED: (state, action) =>
      produce(state, (draft) => {
        const { id, title, description, price, photo, quantity, unitPrice } =
          action.payload; 
        /*if (!draft.itemCounts[id]) {
          draft.itemCounts[id] = 0;
        }
        draft.itemCounts[id] += 1;*/

        draft.basketBuyLength = draft.value.reduce(
          (accumulator, currentItem) => accumulator + currentItem.quantity,
          1
        );
        console.log(draft.itemCounts);
        const existingItem = draft.value.find(
          (item) => item.id === action.payload.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
          console.log(existingItem.price, existingItem.unitPrice);
          existingItem.price = existingItem.unitPrice * existingItem.quantity;

          // draft.value.price *= existingItem.quantity;
        } else {
          draft.value.push({
            id,
            title,
            description,
            price,
            unitPrice,
            photo,
            quantity: 1,
          });
        }
        /* if (!draft.itemCounts[id]) {
          draft.itemCounts[id] = 0;
        }
        draft.itemCounts[id] += 1;
        console.log(draft.itemCounts);*/
        // به‌روزرسانی basketBuyLength
      }),
    BASKET_REMOVE: (state, action) =>
      produce(state, (draft) => {
        const index = draft.value.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          const item = draft.value[index];
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.price -= item.unitPrice;
          } else {
            draft.value.splice(index, 1);
          }
        }
        // draft.basketBuyLength-=1
        draft.basketBuyLength = draft.value.reduce(
          (accumulator, currentItem) => accumulator + currentItem.quantity,
          0
        );
        // console.log("uuu",draft.basketBuyLength);
      }),
    SWITCH_STATUS_BASKET: (state, action) =>
      produce(state, (draft) => {
        draft.statusBasket = action.payload.statusBasket;
      }),
  },
});

export const { BASKET_ADDED, BASKET_REMOVE,SWITCH_STATUS_BASKET } = buyBasket.actions;

export const getBuyBasket = createSelector(
  (state) => state.entities.buyBasket,
  (buyBasket) => buyBasket.value
);
export const getBasketBuyLength = createSelector(
  (state) => state.entities.buyBasket,
  (buyBasket) => buyBasket.basketBuyLength
);
export const getStatusBasket = createSelector(
  (state) => state.entities.buyBasket,
  (buyBasket) => buyBasket.statusBasket
);

export const getTotalPrice = createSelector(
  (state) => state.entities.buyBasket.value,
  (items) =>
    Array.isArray(items)
      ? items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
      : 0
);

export default buyBasket.reducer;
