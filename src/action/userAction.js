import axios from 'axios';
import { CLEAR_ERROR, CLEAR_MESSAGE, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from '../constant/userConstant';


export const login = (email,password) => async (dispatch) =>{

    try {
        
        dispatch({type: LOGIN_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post('/api/v1/login', { email,password },config)

        dispatch({
          type: LOGIN_SUCCESS,
          payload: data.user,
          message: `Welcome back ${data.user.name}`, 
          
      });



    } catch (error) {
        dispatch({type: LOGIN_FAIL,payload: error.response.data.message })
    }
}


// Register


export const register = (formData) => async (dispatch) =>{
  try {
      
      dispatch({type: REGISTER_REQUEST});

      const config = { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true };

      const {data} = await axios.post('/api/v1/register', formData, config);

      dispatch({type: REGISTER_SUCCESS, payload:data.user, message: `Register Successfully ${data.user.name}`,})

  } catch (error) {
      dispatch({
          type: REGISTER_FAIL,
          payload: error.response.data.message,
      })
  }
}


// Load User
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get('/api/v1/me'); 
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };


  //logout 

  export const logout = () => async (dispatch) =>{

    try {
        await axios.get('/api/v1/logout');
        dispatch({type: LOGOUT_SUCCESS, message: 'Logout Successfully!',})
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  }


// Clear ERRORS
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };


  
// Clear ERRORS
export const clearMessage = () => async (dispatch) => {
    dispatch({
      type: CLEAR_MESSAGE,
    });
  };