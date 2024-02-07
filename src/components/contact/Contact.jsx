import React, { useEffect, useState } from 'react';
import '../../styles/contact.scss';
import burger from '../../assets/burger2.png';
import { useDispatch, useSelector } from 'react-redux'; // Use ES6 import syntax
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../constant/userConstant';
import Loader from '../Loader/Loader';
import { contactAction } from '../../action/otherAction'; // Assuming contactAction is a named export
import {toast} from 'react-hot-toast'

const Contact = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { error, loading, message: myMessage } = useSelector((state) => state.contact);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(contactAction(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: CLEAR_ERROR });
    }

    if (myMessage) {
      toast.success(myMessage);
      dispatch({ type: CLEAR_MESSAGE });
      // Clear the input fields after successfully sending the message
      setName('');
      setEmail('');
      setMessage('');
    }
  }, [error, myMessage, dispatch]);
  

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className='contact'>
          <form onSubmit={submitHandler}>
            <h2>Contact Us</h2>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              name=''
              id=''
              cols='30'
              rows='10'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder='Message...'
            ></textarea>
            <button type='submit'>Send</button>
          </form>
          <div className='formL'>
            <div>
              <img src={burger} alt={'burger'} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Contact;
