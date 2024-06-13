import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { collection, getDocs } from "firebase/firestore";

import "./index.css";

import { db } from "../firebase.js";
import {
  getAllProducts,
  selectProducts,
} from "../features/products/productSlice";
import { changeLoadingState } from "../features/customLoaders/loaderSlice";

import SingleItem from "../components/global/singleItem/SingleItem";

const Home = () => {
  const { products } = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(changeLoadingState(true));
    }
    getDocs(collection(db, "products"))
      .then((res) => {
        const allProducts = [];
        res.forEach((doc) => {
          allProducts.unshift({ id: doc.id, ...doc.data() });
        });
        dispatch(getAllProducts(allProducts));
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home">
      {!!products &&
        products.map((product) => {
          return <SingleItem product={product} key={product.id} />;
        })}
    </div>
  );
};

export default Home;
