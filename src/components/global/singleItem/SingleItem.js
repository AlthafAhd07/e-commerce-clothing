import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import "./style.css";

import { db } from "../../../firebase";
import { selectAuth } from "../../../features/userAuth/authSlice";
import { addToCart, selectCart } from "../../../features/userCart/cartSlice";
import { showToast } from "../../../features/alert/alertSlice";
const SingleItem = ({ product }) => {
  const { user } = useSelector(selectAuth);
  const { products } = useSelector(selectCart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ItemExistsInCart = products?.some(
    (item) => item?.product?.id === product?.id
  );
  function handleClick() {
    if (ItemExistsInCart) {
      dispatch(
        showToast({
          visible: true,
          msg: "Product Already exists...",
          type: "err",
        })
      );
      return;
    }
    dispatch(
      showToast({
        visible: true,
        msg: "Added to Cart",
        type: "success",
      })
    );
    dispatch(
      addToCart({
        product: product,
        count: 1,
      })
    );
    if (!!user) {
      updateDoc(doc(db, "userCart", user.uid), {
        cartItems: arrayUnion({ item: product.id, count: 1 }),
      });
    }
  }
  return (
    <div className="singleItem">
      <img
        src={product?.images[0]?.img}
        alt="Product"
        onClick={() => {
          navigate(`/product/${product?.id}`);
        }}
      />
      <h3>{product.name}</h3>
      <p>Price : ${product.price}</p>
      <button
        style={{ backgroundColor: `${ItemExistsInCart ? "green" : ""}` }}
        onClick={handleClick}
      >
        {ItemExistsInCart ? "Added To Cart" : "Add To Cart"}
      </button>
    </div>
  );
};

export default SingleItem;
