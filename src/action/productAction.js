import axios from "axios";
import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../constant/productConstant";


export const getProduct = (keyword="",currentPage=1,price=[0,25000],category,ratings = 0) => async (dispatch)=>{
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        //For category FIlter

        if(category){
            link =  `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const {data} = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
  }



 // Create Product
 export const createProduct = (productData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
  
      const config = {
        headers: { "Content-Type": "application/json" },
      };
  
      const { data } = await axios.post(
        '/api/v1/admin/product/new',
        productData,
        config
      );
  
      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  

  //Product Details Action 

  export const getProductDetails = (id) => async (dispatch)=>{
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const {data} = await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
  }

    