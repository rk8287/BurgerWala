import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../action/cartAction';
import '../../styles/cart.scss';
import { Link } from 'react-router-dom';
import { MdDelete,MdRemoveShoppingCart } from "react-icons/md";


const CartItem = ({ title, img, quantity, product, stock }) => {
  const dispatch = useDispatch();

  const increaseQuantity = () => {
  const newQty = quantity + 1;
  if (stock <= quantity) {
    return;
  }
  dispatch(addItemsToCart(product, newQty, stock)); // Pass the correct parameters
};


  const decreaseQuantity = () => {
    const newQty = quantity - 1;
    if (newQty >= 1) {
      dispatch(addItemsToCart(product, newQty));
    }
  };


  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(product));
  };

  return (
    <div className='cartItem'>
      <div>
        <h4>{title}</h4>
        <img src={img} alt="" />
      </div>

      <div>
        <button onClick={decreaseQuantity}>-</button>
        <input type="number" readOnly value={quantity} />
        <button onClick={increaseQuantity}>+</button>

        
    <div className='btn' style={{
      padding:'0.7rem 1.7rem'
    }}>
      <button  style={{padding:'0.1rem', border:'none', fontSize:'1.4rem', cursor:'pointer', color:'red'}} onClick={deleteCartItems}><MdDelete/></button>
    </div>
      </div>
      
    </div>
  );
};

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  // Calculate Subtotal, Gst, Shipping Charges, and Total dynamically
  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const gst = subtotal * 0.18;
  const shippingCharges = 200;
  const total = subtotal + gst + shippingCharges;


  

  return (
 <>
 {cartItems.length === 0 ? (
        <div className="emptyCart">
        <MdRemoveShoppingCart/>

          <h1>No Product in Your Cart</h1>
          <Link to="/menu">View Tastey Burgers</Link>
        </div>
 ):(
  <section className='cart'>
  <main>
    {cartItems.map((item) => (
      <CartItem
        key={item.id}
        title={item.name}
        img={item.image}
        quantity={item.quantity}
        product={item.product}
        stock={item.stock}
      />
    ))}

    <article>
      <div>
        <h1>Sub Total</h1>
        <p>₹{subtotal}</p>
      </div>

      <div>
        <h1>Gst</h1>
        <p>₹{gst}</p>
      </div>

      <div>
        <h1>Shipping Charges</h1>
        <p>₹{shippingCharges}</p>
      </div>

      <div>
        <h1>Total</h1>
        <p>₹{total}</p>
      </div>

      <Link to={'/shipping'}>Checkout</Link>
    </article>
  </main>
</section>
 )}
 </>
  );
};

export default Cart;
