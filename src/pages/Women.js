import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import {
  getWomenProducts,
  selectProducts,
} from "../features/products/productSlice";
import { changeLoadingState } from "../features/customLoaders/loaderSlice";

import SingleItem from "../components/global/singleItem/SingleItem";

const Women = () => {
  const { women } = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!women.length) {
      dispatch(changeLoadingState(true));
    }
    const q = query(
      collection(db, "products"),
      where("category", "==", "women")
    );
    getDocs(q)
      .then((res) => {
        let allProducts = [];
        res.forEach((doc) => {
          allProducts.push({ ...doc.data(), id: doc.id });
        });
        dispatch(getWomenProducts(allProducts));
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        alert(err);
        dispatch(changeLoadingState(false));
      });
  }, []);

  return (
    <div className="home">
      {!!women &&
        women.map((product) => {
          return <SingleItem product={product} key={product.id} />;
        })}
    </div>
  );
};

export default Women;
