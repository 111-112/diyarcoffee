import React, { forwardRef } from 'react';

const ShoppingCartPrint = forwardRef((props, ref) => {
  const { getBuyBasket, totalPrice } = props;

  return (
    <div ref={ref}>
      <h2>سبد خرید</h2>
      {getBuyBasket.map((value, index) => (
        <div key={index}>
          <h3>{value.title}</h3>
          <p>توضیحات: {value.description}</p>
          <p>قیمت: {value.price} تومان</p>
          <p>تعداد: {value.quantity}</p>
        </div>
      ))}
      <hr />
      <h3>هزینه کل: {totalPrice} تومان</h3>
    </div>
  );
});

export default ShoppingCartPrint;
