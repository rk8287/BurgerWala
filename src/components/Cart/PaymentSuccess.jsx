import React from "react";
import "../../styles/paymentSuccess.css";
import { Link } from "react-router-dom";
const Sucess = require('../../assets/success-order.gif')

const PaymentSuccess = () => {
  return (
    <div className="orderSuccess">
    <div className="image">
    <img src={Sucess} alt="" />
    </div>

      <h1>Your Order has been Placed successfully </h1>
      <Link to="/Myorder">View Orders</Link>
    </div>
  );
};

export default PaymentSuccess;

