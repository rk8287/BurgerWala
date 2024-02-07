import React, { useEffect, useState } from 'react'
import '../../styles/profile.scss'
import me from '../../assets/professional.jpg'
import { Link } from 'react-router-dom'
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const Profile = () => {

  const [loginDateTime, setLoginDateTime] = useState(null);
  const {user, loading } = useSelector(state => state.user)

  useEffect(() => {
  
  
    const formattedDateTime = new Date().toLocaleString();
    setLoginDateTime(formattedDateTime);
  }, []);


  if (!user || !user.avatar || !user.avatar.url) {
    
    return <Loader />; 
  }

  return (

  <>
  {loading ? <Loader/>: (
     <section className='profileSection'>

     <main className='profileMain'>
     
     <img src={user.avatar.url} alt={user.name}  />
     {loginDateTime && <p style={{ color: 'rgb(185, 185, 185)' }}>{`Date ${loginDateTime}`}</p>}
     
     <h5>{`${user.name}`}</h5>
     <p>{`${user.email}`}</p>
     
     {user && user.role === 'admin' && (
  <div>
    <Link style={{ borderRadius: '0px' }} to={'/admin/newProduct'}>
      <RxDashboard /> Dashboard
    </Link>
  </div>
)}

     
     <div>
     <Link to={'/Myorder'}>Orders</Link>
     </div>
     
     <button><FiLogOut/>Logout</button>
     
     </main>
     
        </section>
  )}
  </>
  )
}

export default Profile