import axios from "axios"
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../constant/userConstant"


export const contactAction = (name,email,message) => async(dispatch)=>{


    try {
        
        dispatch({type: CONTACT_REQUEST})

        const config = { headers: { "Content-Type": "application/json" } };

        const {data} = await axios.post('/api/v1/contact',{name,email,message}, config)

        dispatch({type: CONTACT_SUCCESS, payload: data.message})

    } catch (error) {
        dispatch({type: CONTACT_FAIL, payload: error.response.data.message})
    }


}