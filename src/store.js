import {createStore,combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { userReducer } from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import { myOrderReducer, newOrderReducer, orderDetailsReducer } from './reducer/orderReducer';
import { newProductReducer, productDetailsReducer, productReducer } from './reducer/productReducer';
import {contactDetailsReducer} from './reducer/otherReducer'


const reducer = combineReducers({

    user: userReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    newProduct: newProductReducer,
    orders: myOrderReducer,
    products: productReducer,
    productDetails:productDetailsReducer,
    orderDetails: orderDetailsReducer,
    contact: contactDetailsReducer
   
    
    


});

let initialState = {
    cart: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
  };
  


const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;