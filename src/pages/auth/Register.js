import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import "./style.css";

import { auth, db } from "../../firebase.js";
import { selectCart } from "../../features/userCart/cartSlice";
import { login } from "../../features/userAuth/authSlice";
import { doc, setDoc } from "firebase/firestore";
import { showToast } from "../../features/alert/alertSlice";
import { selectLoading } from "../../features/customLoaders/loaderSlice";

const Register = () => {
  const { products } = useSelector(selectCart);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleInputChange(e) {
    setUserData((old) => {
      return {
        ...old,
        [e.target.name]: e.target.value,
      };
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (userData.username?.length < 4) {
      dispatch(
        showToast({
          visible: true,
          msg: "Username should be at least 4 characters",
          type: "error",
        })
      );
      return;
    }
    if (userData.password?.length < 6) {
      dispatch(
        showToast({
          visible: true,
          msg: "password should be at least 6 characters",
          type: "error",
        })
      );
      return;
    }
    if (userData.password !== userData?.confirmPassword) {
      dispatch(
        showToast({
          visible: true,
          msg: "Confirm password Does Not match",
          type: "error",
        })
      );
      return;
    }

    dispatch(selectLoading(true));
    createUserWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userAuth) => {
        setDoc(doc(db, "userCart", userAuth.user.uid), {
          name: userData.username,
          cartItems: products || [],
        }).then(() => {
          updateProfile(userAuth.user, {
            displayName: userData.username,
          }).then(() => {
            dispatch(
              login(userAuth.user.uid, userData.username, userAuth.user.email)
            );
            dispatch(selectLoading(false));
            dispatch(
              showToast({
                visible: true,
                msg: "Account created Successfully.",
                type: "success",
              })
            );
            navigate("/");
          });
        });
      })
      .catch((err) => {
        dispatch(selectLoading(false));
        switch (err.code) {
          case "auth/email-already-in-use":
            dispatch(
              showToast({
                visible: true,
                msg: "E-mail Already taken",
                type: "error",
              })
            );
            break;

          default:
            dispatch(
              showToast({
                visible: true,
                msg: err.code,
                type: "error",
              })
            );
        }
      });
  }

  return (
    <div className="auth">
      <div className="auth__wrapper register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            placeholder="John"
            id="userName"
            name="username"
            value={userData.username || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Admin@gmial.com"
            id="email"
            name="email"
            value={userData.email || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            name="password"
            value={userData.password || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPassword"
            name="confirmPassword"
            value={userData.confirmPassword || ""}
            onChange={handleInputChange}
          />
          <button type="submit">Register</button>
        </form>
        <div className="bottom__stuff">
          Already Have an Acccount : {` `} <Link to="/login">Login Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
