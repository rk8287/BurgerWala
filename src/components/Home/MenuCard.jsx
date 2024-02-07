import React from 'react';
import '../../styles/menu.scss';
import { Link } from 'react-router-dom';

const MenuCard = ({ itemNum, burgerSrc, price, title, delay, id }) => {
 

  return (
    <div
      className='menuCard'
      initial={{
        x: '-100%',
        opacity: 0,
      }}
      whileInView={{
        x: '0',
        opacity: 1,
      }}
      transition={{
        delay,
      }}
    >
      <div>{itemNum}</div>

      <main>
        <img src={burgerSrc} alt={itemNum} />

        <h5>₹{price}</h5>

        <p>{title}</p>

        <Link className='lol' to={`/product/${id}`}>
         Add TO Cart
        </Link>
      </main>
    </div>
  );
};

export default MenuCard;
