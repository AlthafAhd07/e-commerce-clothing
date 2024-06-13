import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../firebase.js";
import { login } from "../../features/userAuth/authSlice";
import { selectCart } from "../../features/userCart/cartSlice";
import { showToast } from "../../features/alert/alertSlice";
import { changeLoadingState } from "../../features/customLoaders/loaderSlice";
const Login = () => {
  const { products } = useSelector(selectCart);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (email.length < 1 || password.length < 1) {
      dispatch(
        showToast({
          visible: true,
          msg: "Please fill all fields",
          type: "error",
          time: 3000,
        })
      );
      return;
    }
    dispatch(changeLoadingState(true));
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateDoc(doc(db, "userCart", user.uid), {
          cartItems: arrayUnion(
            ...products.map((i) => {
              return {
                count: i.count,
                item: i.product.id,
              };
            })
          ),
        });

        dispatch(login(user.uid, user.displayName, user.email));
        navigate("/");
        dispatch(
          showToast({
            visible: true,
            msg: "Login Success",
            type: "success",
            time: 3000,
          })
        );
        dispatch(changeLoadingState(false));
      })
      .catch((err) => {
        dispatch(changeLoadingState(false));
        switch (err.code) {
          case "auth/wrong-password":
            dispatch(
              showToast({
                visible: true,
                msg: "Wrong password",
                type: "error",
                time: 3000,
              })
            );
            break;
          case "auth/user-not-found":
            dispatch(
              showToast({
                visible: true,
                msg: "User Not Found",
                type: "error",
                time: 3000,
              })
            );
            break;

          default:
            dispatch(
              showToast({
                visible: true,
                msg: err.code,
                type: "error",
                time: 3000,
              })
            );
        }
      });
  }
  return (
    <div className="auth">
      <div className="auth__wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Admin@gmial.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <div className="bottom__stuff">
          New to here : {` `} <Link to="/register">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
