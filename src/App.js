import { useEffect, useState } from 'react';
import Login from './components/Authentication/Login';
import Profile from './components/Authentication/Profile';
import Cart from './components/Cart/Cart';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import MyOrder from './components/Cart/MyOrder';
import MyorderDetails from './components/Cart/MyorderDetails';
import Shipping from './components/Cart/Shipping';
import Home from './components/Home/Home';
import Menu from './components/Home/Menu';
import Contact from './components/contact/Contact';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import './styles/app.scss'
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import { loadUser } from './action/userAction';
import store from './store';
import { useDispatch, useSelector } from 'react-redux';
import toast,{Toaster} from 'react-hot-toast'
import { CLEAR_ERROR, CLEAR_MESSAGE } from './constant/userConstant';
import NewProduct from './Admin/NewProduct';
import ProductDetails from './components/Home/ProductDetails';
import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSuccess from './components/Cart/PaymentSuccess';
import NotFound from './components/layout/NotFound';

function App() {

    const dispatch = useDispatch();

  const {isAuthenticated,user,error,message,authorizeRoles} = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
 
  
    try {
        const { data } = await axios.get(`/api/v1/stripeapikey`); 
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle the error here
      console.error("Error fetching Stripe API key:", error);
    }
  }




  const stripePromise = loadStripe(stripeApiKey);

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }
  
    if (message) {
      toast.success(message);
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [dispatch, error, message]);
  

  return (
    
      <Router>

    
    <Header isAuthenticated={isAuthenticated} authorizeRoles={authorizeRoles}  user={user}/>
    <Toaster/>
    <Routes>

<Route path='/' element={<Home/>}/>
<Route path='/menu' element={<Menu/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/cart' element={ isAuthenticated ? <Cart /> :<Navigate to="/login" /> }/>
<Route path='/shipping' element={ isAuthenticated ? <Shipping />:<Navigate to="/login" /> }/>
<Route path='/confirmOrder' element={ isAuthenticated ? <ConfirmOrder /> :<Navigate to="/login" /> }/>
<Route path='/success' element={isAuthenticated ? <PaymentSuccess />:<Navigate to="/login" />  }/>

{stripeApiKey && (
      <Route
      
      path="/process/payment"
    element={
      <Elements stripe={stripePromise}>
       {isAuthenticated ? <Payment /> : <Navigate to="/confirmOrder" />}
      </Elements>
    }
  />
)}


<Route path='/product/:id' element={ <ProductDetails /> }/>


<Route path='/login' element={ isAuthenticated ? <Navigate to="/" />: <Login />} />
<Route path='*' element={ <NotFound />} />

<Route path='/me' element={ isAuthenticated ? <Profile /> :<Navigate to="/login" /> }/>
<Route path='/Myorder' element={ isAuthenticated ? <MyOrder /> :<Navigate to="/login" /> }/>
<Route path='/orders/:id' element={ isAuthenticated ? <MyorderDetails /> :<Navigate to="/login" /> }/>

<Route
  path='/admin/newProduct'
  element={isAuthenticated && user && user.role === 'admin' ? <NewProduct /> : <Navigate to="/" />}
/>


    
    </Routes>

    <Footer />



      </Router>
  );
}

export default App;
