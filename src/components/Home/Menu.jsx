import React, { useEffect, useState } from 'react';
import '../../styles/menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../action/productAction';
import { CLEAR_ERROR } from '../../constant/productConstant';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MenuCard from './MenuCard';
import Loader from '../Loader/Loader';

const Menu = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 200000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (error) {
          toast.error(error);
          dispatch({ type: CLEAR_ERROR });
        }

        dispatch(getProduct(keyword, currentPage, price, category, ratings));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <>
    {loading ? <Loader/> :(
      <section id='menu'>
      <h1>Menu</h1>
      {products && (
        <div>
          {products.map((product) => (
           
              <MenuCard
                id={product._id}
                key={product._id}
                itemNum={product.itemNum}
                burgerSrc={product.images[0].url}
                price={product.price}
                title={product.title}
                delay={product.delay}
              />
      
          ))}
        </div>
      )}
    </section>
    )}
    </>
  );
};

export default Menu;
