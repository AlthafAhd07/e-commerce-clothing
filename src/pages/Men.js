import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firebase";
import {
  getMenProducts,
  selectProducts,
} from "../features/products/productSlice";
import { changeLoadingState } from "../features/customLoaders/loaderSlice";

import SingleItem from "../components/global/singleItem/SingleItem";
const Men = () => {
  const { men } = useSelector(selectProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!men.length) {
      dispatch(changeLoadingState(true));
    }
    const q = query(collection(db, "products"), where("category", "==", "men"));
    getDocs(q)
      .then((res) => {
        let allProducts = [];
        res.forEach((doc) => {
          allProducts.push({ ...doc.data(), id: doc.id });
        });
        dispatch(getMenProducts(allProducts));
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        alert(err);
        dispatch(changeLoadingState(false));
      });
  }, []);
  return (
    <div className="home">
      {!!men &&
        men.map((product) => {
          return <SingleItem product={product} key={product.id} />;
        })}
    </div>
  );
};

export default Men;
