import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "../../styles/payment.css";
import { AiOutlineCreditCard } from "react-icons/ai";
import { BsCalendar3EventFill } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js"; // Import loadStripe
import { createOrder } from "../../action/orderAction";
import { clearErrors } from "../../action/userAction";
import Loader from "../Loader/Loader";

const Payment = () => {

  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.newOrder);


  // Define stripePromise with your publishable key
  const stripePromise = loadStripe('process.env.STRIPE_API_KEY');

  // Fetch the Stripe API key from your server
  const fetchStripeApiKey = async () => {
    try {
      const response = await axios.get(`/api/v1/stripeapikey`);
      // Set the Stripe API key
      if (response.data.stripeApiKey) {
        stripePromise.setPublishableKey(response.data.stripeApiKey);
      }
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  };

  useEffect(() => {
    fetchStripeApiKey();
  }, []);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    if (!stripe || !elements) {
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          toast.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      
      {loading ? <Loader/> :(
        <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <h1>Card Info</h1>
          <div>
            <AiOutlineCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <BsCalendar3EventFill />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      )}
    </Fragment>
  );
};

export default Payment;