import { createSlice, createSelector } from "@reduxjs/toolkit";
import { produce } from "immer";

const initialState = {
  value: [],
  basketBuyLength: 0,
  itemCounts: {},
};

const buyBasket = createSlice({
  name: "buyBasket",
  initialState,
  reducers: {
    BASKET_ADDED: (state, action) =>
      produce(state, (draft) => {
        const { id, title, description, price, photo, quantity } =
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
        } else {
          draft.value.push({
            id,
            title,
            description,
            price,
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
  },
});

export const { BASKET_ADDED, BASKET_REMOVE } = buyBasket.actions;

export const getBuyBasket = createSelector(
  (state) => state.entities.buyBasket,
  (buyBasket) => buyBasket.value
);
export const getBasketBuyLength = createSelector(
  (state) => state.entities.buyBasket,
  (buyBasket) => buyBasket.basketBuyLength
);

export const getTotalPrice = createSelector(
  (state) => state.entities.buyBasket.value,
  (items) =>
    Array.isArray(items)
      ? items.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0
);

export default buyBasket.reducer;
