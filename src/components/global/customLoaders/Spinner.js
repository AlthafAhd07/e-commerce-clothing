import React from "react";
import { useSelector } from "react-redux";

import "./spinner.css";

import { selectLoading } from "../../../features/customLoaders/loaderSlice";
const Spinner = () => {
  const { loading } = useSelector(selectLoading);
  return (
    <div className="SpinnerWrapper" data-outload={loading}>
      <div className="loadingio-spinner-spinner-hh9ssequpj9">
        <div className="ldio-gqiu1itk7k">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
