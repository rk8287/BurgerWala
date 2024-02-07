import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineEye} from 'react-icons/ai'
import '../../styles/myOrders.scss'
import { useDispatch, useSelector } from 'react-redux'
import { myOrder } from '../../action/orderAction'
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader'


const MyOrder = () => {

  const {orders, loading, error} = useSelector((state) => state.orders)
  const dispatch = useDispatch();


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    dispatch(myOrder());
  }, [dispatch, error]);

  return (
  <>
  {loading ? <Loader/> :(
     <section className='orderSection'>

     <main className='orderMain'>
    <table>
 
    <thead>
         
         <tr>
             <th>Order Id</th>
             <th>Status</th>
             <th>Item Qty</th>
             <th>Amout</th>
             <th>Payment Method</th>
             <th>Action</th>
         </tr>
 
     </thead>
      <tbody>
 
      {orders && orders.map((i)=>(
        <tr key={i._id}>
        <td>#{i._id}</td>
        <td>{i.orderStatus}</td>
        <td>
           {i.orderItems.length}</td>
        <td>{i.totalPrice}</td>
        <td>Online</td>
        <td><Link to={`/orders/${i._id}`}><AiOutlineEye/></Link></td>
      </tr>
      ))}
      </tbody>
   
 
    </table>
 
     </main>
 
    </section>
  )}
  </>
  )
}

export default MyOrder