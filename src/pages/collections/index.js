import React from "react";
import { Link } from "react-router-dom";

import "./collections.css";

function CollectionItem({ title, imgRow1, imgRow2 }) {
  return (
    <div className="collection__item">
      <div className="collection__imgGroup">
        <div className="img__row">
          {imgRow1.map((l) => {
            return <img key={l} src={l} alt="" />;
          })}
        </div>
        <div className="img__row">
          {imgRow2.map((l) => {
            return <img key={l} src={l} alt="" />;
          })}
        </div>
      </div>
      <h1>{title}</h1>
    </div>
  );
}

const Collections = () => {
  return (
    <div className="collections">
      <Link to="/men">
        <CollectionItem
          title="Men"
          imgRow1={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428070/image-product-1_xqdxbx.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428098/image-product-2_jlsvyk.jpg",
          ]}
          imgRow2={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428134/image-product-3_hd30kn.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428178/image-product-4_ptnnmn.jpg",
          ]}
        />
      </Link>
      <Link to="/women">
        <CollectionItem
          title="Women"
          imgRow1={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428070/image-product-1_xqdxbx.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428098/image-product-2_jlsvyk.jpg",
          ]}
          imgRow2={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428134/image-product-3_hd30kn.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428178/image-product-4_ptnnmn.jpg",
          ]}
        />
      </Link>
      <Link to="/">
        <CollectionItem
          title="All"
          imgRow1={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428070/image-product-1_xqdxbx.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428098/image-product-2_jlsvyk.jpg",
          ]}
          imgRow2={[
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428134/image-product-3_hd30kn.jpg",
            "https://res.cloudinary.com/davg6e0yh/image/upload/v1666428178/image-product-4_ptnnmn.jpg",
          ]}
        />
      </Link>
    </div>
  );
};

export default Collections;
