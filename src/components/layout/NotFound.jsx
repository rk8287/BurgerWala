import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import '../../styles/notFound.scss'

const NotFound = () => {
  return (
    <div className='container'>
      <div>
        <RiErrorWarningFill size="5rem" />
        <h1>Page Not Found</h1>
        <Link to="/">
          <button style={{backgroundColor:'rgb(156,0,60)',color:'white',padding:'10px 18px',border:'none',cursor:'pointer',borderRadius:'5px'
        ,marginTop:'8px'
        }} className='btn'>
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
