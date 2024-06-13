import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./style.css";

import { selectCart } from "../../features/userCart/cartSlice";

import Left from "../../components/userCart/Left";
import Right from "../../components/userCart/Right";

const Cart = () => {
  const { products, productCount } = useSelector(selectCart);

  const [fullTotal, setFullTotal] = useState(0);
  return (
    <div className="cart">
      <h1 className="cart__heading">
        My basket{" "}
        <span>
          ( {productCount} {productCount > 1 ? "ITEMS" : "ITEM"} )
        </span>
      </h1>
      {productCount > 0 ? (
        <div className="wrapper">
          <Left products={products} setFullTotal={setFullTotal} />
          <Right productCount={productCount} fullTotal={fullTotal} />
        </div>
      ) : (
        <h2 style={{ fontSize: "2rem" }}>No Products in your basket</h2>
      )}
    </div>
  );
};

export default Cart;
