import React, { useState } from 'react';
import { Country, State } from 'country-state-city';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../action/cartAction';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../../styles/shipping.scss'

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error('Phone Number should be 10 digits Long');
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNo }));
    navigate('/confirmOrder');
  };

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setState(''); // Reset state when country changes
  };

  return (
    <section className='shipping'>
      <main>
        <h1>Shipping Details</h1>

        <form encType='multipart/form-data' onSubmit={shippingSubmit}>
          <div>
            <label>Address</label>
            <input
              type='text'
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder='Enter House No'
            />
          </div>

          <div>
            <label>City</label>
            <input
              type='text'
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='Enter City No'
            />
          </div>

          <div>
            <label>Country</label>
            <select required onChange={(e) => handleCountryChange(e.target.value)} value={country}>
              {Country && Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>State</label>
            <select
              onChange={(e) => setState(e.target.value)}
              value={state}
              disabled={!country} // Disable state dropdown if no country is selected
            >
              {State &&
                State.getStatesOfCountry(country).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Pincode</label>
            <input
              type='text'
              required
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder='Enter Pincode No'
            />
          </div>

          <div>
            <label>Phone No</label>
            <input
              type='number'
              required
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder='Enter Phone No'
            />
          </div>

          <button type='submit'>Confirm Order</button>
        </form>
      </main>
    </section>
  );
};

export default Shipping;
