import React, { useState } from "react";

import "./userCart.css";
const Right = ({ productCount, fullTotal }) => {
  const [delivery, setDelivery] = useState(5);
  return (
    <div className="cart__right">
      <h1 className="cart__summaryTitle">Order Summary</h1>
      <div className="cart__other">
        <div className="ItemCountPrice">
          <span>
            {productCount} {productCount > 1 ? "ITEMS" : "ITEM"}
          </span>
          <span>${fullTotal.toFixed(2)}</span>
        </div>
        <div className="ItemShippingOption">
          <p>SHIPPING</p>
          <select onInput={(e) => setDelivery(e.target.value)}>
            <option value="5">Standart delivery - $5</option>
            <option value="15">Fast delivery - $15</option>
          </select>
        </div>
        <div className="item__promoCode">
          <p>PROMO CODE</p>
          <input type="text" placeholder="Enter your code" />
          <button>APPLY</button>
        </div>
      </div>
      <hr className="horizontalLine" />
      <div className="cart__total">
        <div className="ItemCountPrice">
          <span>SUBTOTAL</span>
          <span>${fullTotal.toFixed(2)}</span>
        </div>
        <div className="ItemCountPrice">
          <span>DELIVERY</span>
          <span>${delivery}</span>
        </div>
        <div className="ItemCountPrice">
          <span>TOTAL</span>
          <span>
            ${(parseFloat(delivery) + parseFloat(fullTotal)).toFixed(2)}
          </span>
        </div>
        <button>CHECKOUT</button>
      </div>
    </div>
  );
};

export default Right;
