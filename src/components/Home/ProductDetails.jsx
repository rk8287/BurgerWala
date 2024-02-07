import React, { useEffect, useState } from "react";
import "../../styles/ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-hot-toast'; // Import the 'toast' function from react-toastify
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { addItemsToCart } from "../../action/cartAction";
import { getProductDetails } from "../../action/productAction";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const {id} = useParams()

  const { product, loading, error } = useSelector((state) => state.productDetails);
  

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.stock <= quantity) return; 
  
    const qty = quantity + 1;
    setQuantity(qty);
  };
  

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  
  useEffect(() => {
    // Dispatch the action to get product details when the component mounts
    dispatch(getProductDetails(id));
  }, [dispatch, id]);


  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  



  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          
          <div className="ProductDetails">
            <div>
             
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
             
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
  Status:
  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
    {product.stock < 1 ? "OutOfStock" : "InStock"}
  </b>
</p>

              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

            </div>
          </div>

        </>
      )}
    </>
  );
};

export default ProductDetails;