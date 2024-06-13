import React from "react";
import { Link } from "react-router-dom";

const CarouselItem = ({ product }) => {
  return (
    <div className="carouselItem">
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0].img} alt="" />
      </Link>
      <h2>{product.name}</h2>

      <p>Price : ${product.price}</p>
    </div>
  );
};

export default CarouselItem;
