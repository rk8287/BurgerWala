import React, { useEffect, useRef, useState } from "react";
import "../../styles/login.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage, login, register } from "../../action/userAction";
import toast,{Toaster} from 'react-hot-toast';
import Loader from "../Loader/Loader";




const Login = () => {

  const dispatch = useDispatch();
  
  const {error,loading,isAuthenticated,message} = useSelector(state => state.user)
   

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
  
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(null);

  
    const loginSubmit = (e) => {
     
      e.preventDefault();
      dispatch(login(loginEmail,loginPassword))
    };
  
    const registerSubmit = (e) => {
     e.preventDefault();

     const formData = new FormData();
     formData.append("name", name);
     formData.append("email", email);
     formData.append("password", password);
     formData.append("avatar", avatarPreview);
      dispatch(register(formData))
    };

    useEffect(() => {
      if(error){
         toast.error(error)
         dispatch(clearErrors())
      }

      if(message){
        toast.success(message)
        dispatch(clearMessage())
      }

      if (isAuthenticated && name) {
        toast.success(`Registration successful for ${name}!`);
      }
     
 
     }, [dispatch, isAuthenticated, name]);
     
    
    

  
    const switchTabs = (e, tab) => {
      if (tab === "login") {
        switcherTab.current.classList.add("shiftToNeutral");
        switcherTab.current.classList.remove("shiftToRight");
  
        registerTab.current.classList.remove("shiftToNeutralForm");
        loginTab.current.classList.remove("shiftToLeft");
      }
      if (tab === "register") {
        switcherTab.current.classList.add("shiftToRight");
        switcherTab.current.classList.remove("shiftToNeutral");
  
        registerTab.current.classList.add("shiftToNeutralForm");
        loginTab.current.classList.add("shiftToLeft");
      }
    };
  return (
    
    <>
   {loading ? <Loader/>: (
     <div className="LoginSignUpContainer">
     <div className="LoginSignUpBox">
       <div>
         <div className="login_signUp_toggle">
           <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
           <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
         </div>
         <button ref={switcherTab}></button>
       </div>
       <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
         <div className="loginEmail">
           
           <input
             type="email"
             placeholder="Email"
             required
             value={loginEmail}
             onChange={(e) => setLoginEmail(e.target.value)}
           />
         </div>
         <div className="loginPassword">
          
           <input
             type="password"
             placeholder="Password"
             required
             value={loginPassword}
             onChange={(e) => setLoginPassword(e.target.value)}
           />
         </div>
         <Link to="/password/forgot">Forget Password ?</Link>
         <input type="submit" value="Login" className="loginBtn" />
       </form>
       <form
         className="signUpForm"
         ref={registerTab}
         encType="multipart/form-data"
         onSubmit={registerSubmit}
       >
         <div className="signUpName">
           
           <input
             type="text"
             placeholder="Name"
             required
             name="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </div>
         <div className="signUpEmail">
          
           <input
             type="email"
             placeholder="Email"
             required
             name="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
           />
         </div>
         <div className="signUpPassword">
          
           <input
             type="password"
             placeholder="Password"
             required
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>

         <div id="registerImage">
           <img src={avatarPreview} alt="Avatar Preview" />
           <input
             type="file"
             name="avatar"
             accept="image/*"
             onChange={(e) => {
               const reader = new FileReader();
               reader.onload = () => {
                 if (reader.readyState === 2) {
                   setAvatarPreview(reader.result);
                 }
               };
               if (e.target.files[0]) {
                 reader.readAsDataURL(e.target.files[0]);
               }
             }}
           />
         </div>
         <input type="submit" value="Register" className="signUpBtn" />
       </form>
     </div>
   </div>
   )}
    </>
  
   
  )
};

export default Login;