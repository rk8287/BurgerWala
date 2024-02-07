import React, { useEffect } from 'react'
import '../../styles/orderDetails.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../action/orderAction';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';

const MyorderDetails = () => {

    const { order, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
      
        dispatch(getOrderDetails(params.id));
      }, [params.id,dispatch]);

    const status = 'Delivered'

    const formattedPaidAt = order && order.paidAt ? new Date(order.paidAt).toLocaleString() : '';
    return (
        <section className="orderDetails">
          {loading === false && order !== undefined ? (
            <main>
              <h1>Order Details</h1>
              <div>
                <h1>Shipping</h1>
                <p>
                  <b>Address</b>
                  {`${order.shippingInfo.address} ${order.shippingInfo.city} ${order.shippingInfo.state} ${order.shippingInfo.country} ${order.shippingInfo.pinCode}`}
                </p>
              </div>
              <div>
                <h1>Contact</h1>
                <p>
                  <b>Name</b>
                  {order.user.name}
                </p>
                <p>
                  <b>Phone</b>
                  {order.shippingInfo.phoneNo}
                </p>
              </div>
    
              <div>
                <h1>Status</h1>
                <p>
                  <b>Order Status</b>
                  {order.orderStatus}
                </p>
                <p>
                  <b>Placed At</b>
                  {order.createdAt.split("T")[0]}
                </p>
                <p>
                  <b>Delivered At</b>
                  {order.deliveredAt ? order.deliveredAt.split("T")[0] : "NA"}
                </p>
              </div>
    
              <div>
                <h1>Payment</h1>
                <p>
                  <b>Payment Method</b>
                  {'ONLINE'}
                </p>

                <p>
                  <b>Payment Status</b>
                  {order.paymentInfo.status}
                </p>

                <p>
                  <b>Payment Reference</b>
                  {order.paymentInfo.id}
                  
                </p>
                <p>
                  <b>Paid At</b>
                  <p><b>Paid At</b> {formattedPaidAt}</p>
                </p>
              </div>
    
              <div>
                <h1>Amount</h1>
                <p>
                  <b>Items Total</b>₹{order.itemsPrice}
                </p>
                <p>
                  <b>Shipping Charges</b>₹{order.shippingPrice}
                </p>
                <p>
                  <b>Tax</b>₹{order.taxPrice}
                </p>
                <p>
                  <b>Total Amount</b>₹{order.totalPrice}
                </p>
              </div>
    
              <article>
    <h1>Order Items</h1>

    {order && order.orderItems.map((item) => (
        <div key={item._id}>
            {item && item.name ? (
                <>
                    <h4>{item.name}</h4>
                    <div>
                        <span>{item.quantity}</span> x <span>{item.price}</span>
                    </div>
                </>
            ) : (
                <p>Invalid Item</p>
            )}
        </div>
    ))}

    <div>
        <h4>Sub Total</h4>
        <div style={{ fontWeight: '800', fontFamily: 'cursive' }}>₹{order && order.totalPrice}</div>
    </div>
</article>
            </main>
          ) : (
            <Loader />
          )}
        </section>
      );
    };
    

export default MyorderDetails