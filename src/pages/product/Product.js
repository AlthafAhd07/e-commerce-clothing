import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import "./product.css";
import { ReactComponent as CartIcon } from "../../images/shopping-cart-icon.svg";

import { db } from "../../firebase";
import { selectAuth } from "../../features/userAuth/authSlice";
import {
  addToCart,
  selectCart,
  updateProductCount,
} from "../../features/userCart/cartSlice.js";
import { selectProducts } from "../../features/products/productSlice";
import {
  changeLoadingState,
  selectLoading,
} from "../../features/customLoaders/loaderSlice";

import IncDecCounter from "../../components/global/IncDecCount/Index";
import CarouselItem from "./CarouselItem";

const Product = () => {
  const { id: productId } = useParams();

  const { user } = useSelector(selectAuth);
  const userCart = useSelector(selectCart);
  const { products } = useSelector(selectProducts);
  const { loading } = useSelector(selectLoading);

  const [mainImgId, setMainImgId] = useState(0);
  const [currentProduct, setCurrentProduct] = useState(() => {
    return products.filter((item) => item.id === productId)[0];
  });
  const [suggested, setSuggested] = useState(() => {
    return products.filter(
      (item) => item?.category === currentProduct?.category
    );
  });

  const trackFirstRender = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!!!currentProduct) {
      dispatch(changeLoadingState(true));
      getDoc(doc(db, "products", productId))
        .then((res) => {
          dispatch(changeLoadingState(false));
          setCurrentProduct(res.data());
        })
        .catch((err) => {
          dispatch(changeLoadingState(false));
          return;
        });
    }
  }, []);

  const productExistInCart = userCart?.products?.filter(
    (item) => item?.product?.id === productId
  );

  const [ItemCount, setItemCount] = useState(() => {
    return productExistInCart[0]?.count || 1;
  });

  useEffect(() => {
    const getMainImagesForMobile = setTimeout(() => {
      currentProduct?.images?.map((image, index) => {
        if (index !== 0) {
          new Image().src = image.img;
        }
        return null;
      });
    }, [500]);
    return () => clearTimeout(getMainImagesForMobile);
  }, []);

  useEffect(() => {
    if (trackFirstRender.current < 1) {
      trackFirstRender.current = 1;
      return;
    }
    let timer = setTimeout(() => {
      if (!!user && productExistInCart.length > 0) {
        updateDoc(doc(db, "userCart", user.uid), {
          cartItems: arrayRemove({
            item: productId,
            count: productExistInCart[0]?.count,
          }),
        });
        updateDoc(doc(db, "userCart", user.uid), {
          cartItems: arrayUnion({
            item: productId,
            count: ItemCount,
          }),
        });
      }
      dispatch(updateProductCount({ id: productId, count: ItemCount }));
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [ItemCount]);
  function handleAddToCart() {
    if (productExistInCart.length > 0) {
      return;
    }
    dispatch(addToCart({ product: currentProduct, count: ItemCount }));
    if (!!user) {
      updateDoc(doc(db, "userCart", user.uid), {
        cartItems: arrayUnion({ item: productId, count: ItemCount }),
      });
    }
  }

  if (!currentProduct)
    return (
      <h1
        style={{
          marginLeft: "30px",
          position: "relative",
          top: "30px",
          fontSize: "2rem",
          fontWeight: "500",
        }}
      >
        {!loading && "Product Does not exists"}
      </h1>
    );

  return (
    <div className="product__wrapper">
      <div className="product">
        <div className="imageGallery">
          <div className="imagePreview">
            <img src={currentProduct?.images[mainImgId]?.img} alt="mainImage" />
          </div>
          <div className="thumbnail">
            {currentProduct?.images?.map((image, index) => {
              return (
                <img
                  key={image.thumbnail}
                  onClick={() => setMainImgId(index)}
                  src={image.thumbnail}
                  alt="thumbnail"
                  style={{
                    filter: `${
                      mainImgId === index ? "grayscale(80%)" : "grayscale(0%)"
                    }`,
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="productData">
          <h6
            style={{
              color: currentProduct?.images?.primaryColor,
            }}
          >
            SNEAKER COMPANY
          </h6>
          <h1 className="productTitle">{currentProduct?.name}</h1>
          <p className="productDescription">{currentProduct?.description}</p>
          <div className="price">
            <p className="price__discounted">
              <span>${currentProduct?.price}</span>
              <span className="discount">50%</span>
            </p>
            <p className="price__exact">${currentProduct?.price * 2 || null}</p>
          </div>
          <div className="AddToCart">
            <IncDecCounter ItemCount={ItemCount} setItemCount={setItemCount} />
            <button
              style={{
                backgroundColor:
                  currentProduct?.images?.primaryColor ||
                  (productExistInCart?.length > 0 && "green"),
                boxShadow:
                  productExistInCart?.length > 0 &&
                  `rgb(58 243 100 / 49%) 0px 2px 8px 0px`,
              }}
              onClick={handleAddToCart}
              className="CartBtn"
            >
              <CartIcon className="cart__icon" fill="white" />
              {productExistInCart?.length > 0 ? "Added to Card" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
      {suggested.length > 0 && (
        <div className="suggested">
          <h1>Products related to this item</h1>
          <div className="carousel">
            {suggested.map((product) => {
              if (product.id === productId) {
                return null;
              } else {
                return <CarouselItem key={product.id} product={product} />;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
