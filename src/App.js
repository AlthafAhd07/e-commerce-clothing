import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "./firebase";
import { selectLoading } from "./features/customLoaders/loaderSlice";
import { selectAlert } from "./features/alert/alertSlice";
import { addMultipleToCart } from "./features/userCart/cartSlice";
import { login } from "./features/userAuth/authSlice";

import Spinner from "./components/global/customLoaders/Spinner";
import NavBar from "./components/global/navBar";
import Home from "./pages/Home";

import Toast from "./components/global/alertToast/Toast";
import useDelayUnmount from "./hooks/useDelayUnmount";

const Men = React.lazy(() => import("./pages/Men"));
const Women = React.lazy(() => import("./pages/Women"));
const Product = React.lazy(() => import("./pages/product/Product"));
const Collections = React.lazy(() => import("./pages/Collections"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Cart = React.lazy(() => import("./pages/cart/Cart"));

function App() {
  const { loading } = useSelector(selectLoading);
  const { toast } = useSelector(selectAlert);

  const dispatch = useDispatch();

  // custom hook for unmount animation
  const showToast = useDelayUnmount(toast.visible, 900);
  const showLoading = useDelayUnmount(loading, 350);
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(login(userAuth.uid, userAuth.displayName, userAuth.email));
        getDoc(doc(db, "userCart", userAuth.uid)).then((userCart) => {
          const productIds = userCart?.data().cartItems?.map((i) => i.item);
          if (userCart.data().cartItems && productIds.length > 0) {
            getDocs(
              query(
                collection(db, "products"),
                where(documentId(), "in", productIds)
              )
            ).then((res) => {
              const allProducts = [];
              res.forEach((i) => {
                const count = userCart
                  .data()
                  .cartItems.filter((item) => item.item === i.id);
                allProducts.push({
                  product: { id: i.id, ...i.data() },
                  count: count[0].count,
                });
              });
              dispatch(addMultipleToCart(allProducts));
            });
          }
        });
      }
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="App">
      <React.Suspense>
        <BrowserRouter>
          <NavBar />
          {!!showLoading && <Spinner />}
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/collections" element={<Collections />} exact />
            <Route path="/men" element={<Men />} exact />
            <Route path="/women" element={<Women />} exact />
            <Route path="/product/:id" element={<Product />} exact />
            <Route path="/cart/:id" element={<Cart />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/register" element={<Register />} exact />
          </Routes>
        </BrowserRouter>
      </React.Suspense>
      {showToast && <Toast />}
    </div>
  );
}

export default App;
