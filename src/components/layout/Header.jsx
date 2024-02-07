import React from 'react'
import {IoFastFoodOutline} from 'react-icons/io5'
import {FiShoppingCart,FiLogIn, FiUser} from 'react-icons/fi'
import {FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../../styles/hader.scss'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../action/userAction'
import toast,{Toaster} from 'react-hot-toast'
import { CiUser } from "react-icons/ci";






const Header = () => {
  
  const {isAuthenticated,message} = useSelector(state => state.user);
  const dispatch = useDispatch()

  function logoutUser() {
    dispatch(logout());
    toast.success(message);
    
  }

  return (
    
    <nav>
      <div
     

 >
      <Link to={'/'}><IoFastFoodOutline style={{fontSize:'3rem'}}/></Link>
      </div>


      <div>
    
    <Link to={'/'}>Home</Link>
    <Link to={'/contact'}>Contact</Link>
    <Link to={'/about'}>About</Link>
    <Link to={'/cart'}><FiShoppingCart/></Link>
    <Link to={isAuthenticated ? '/me': '/login'}>{isAuthenticated ? <FiUser/>: <CiUser/> }</Link>
   
    
    <Link to={isAuthenticated ? '/login': '/login'}>{isAuthenticated ? <FiLogIn onClick={logoutUser}/>: '' }</Link>
    
      </div>
    </nav>
  )
}

export default Header