import React, { useState } from 'react';
import { useFormik } from 'formik';
import Select from '../common/Select';
import axios from 'axios';
import * as Yup from 'yup';

// css
import './PaymentForm.css';

import lock from '../../svg/lock.svg';
// credit cards svg's
import visa from '../../svg/visa.svg';
import mastercard from '../../svg/mastercard.svg';
import amex from '../../svg/amex.svg';
import discover from '../../svg/discover.svg';
import americanExpress from '../../svg/americanExpress.svg';
import maestro from '../../svg/maestro.svg';
// secured by svg's
import norton from '../../svg/norton.svg';
import veriSign from '../../svg/veriSign.svg';
import mcAfee from '../../svg/mcAfee.svg';
import comodo from '../../svg/comodo.svg';

const countrys = ['Lithuania', 'Germany', 'France'];
const states = ['state1', 'state2', 'state3'];

const PaymentForm = () => {
  const [msgFromBackend, setMsgFromBackend] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      country: '',
      regionState: '',
      postalCode: '',
      paymentMethod: '',
      cardNumber: '',
      cardMMYY: '',
      cardCVV: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('required'),
      email: Yup.string()
        .email()
        .max(20, 'Invalid email address')
        .required('required'),
      address: Yup.string().required('required'),
      city: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('required'),
      country: Yup.string().required('required'),
      regionState: Yup.string().required('required'),
      postalCode: Yup.string()
        .min(3, 'Invalid postal code')
        .max(10, 'Invalid postal code')
        .required('required'),
      paymentMethod: Yup.string().required('required'),
      cardNumber: Yup.string()
        .min(16, 'Invalid card number')
        .max(16, 'Invalid card number')
        .required('required'),
      cardMMYY: Yup.string()
        .min(4, 'Invalid date')
        .max(4, 'Invalid date')
        .required('required'),
      cardCVV: Yup.string()
        .max(3, 'CVV is 3 digits')
        .min(3, 'CVV is 3 digits')
        .required('required'),
    }),
    onSubmit: (values) => {
      axios
        .post('http://127.0.0.1:5000/api/import', values)
        .then((res) => setMsgFromBackend(res.data.message))
        .catch((err) => setMsgFromBackend(err.response.data.error.errors[0]));
    },
  });

  // console.log(formik.values);

  return (
    <form className='paymentForm' onSubmit={formik.handleSubmit}>
      <div className='titles widthHundred'>
        <h4>Customer Information</h4>
        <span>Fields marked as(*) are required.</span>
      </div>
      <div className='paymentFormInputWrap widthFifty gap'>
        <input
          className='widthHundred'
          type='text'
          placeholder='*First name'
          name='firstName'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <p className='paymentFormError'>{formik.errors.firstName}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap widthFifty'>
        <input
          className='widthHundred'
          type='text'
          placeholder='*Last name'
          name='lastName'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <p className='paymentFormError'>{formik.errors.lastName}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap widthHundred'>
        <input
          className='widthHundred'
          type='email'
          placeholder='*Email'
          name='email'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className='paymentFormError'>{formik.errors.email}</p>
        ) : null}
      </div>

      <h4 className='shippingAddressTitle'>Shipping Address</h4>

      <div className='paymentFormInputWrap widthHundred'>
        <input
          className='widthHundred'
          type='text'
          placeholder='*Address'
          name='address'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? (
          <p className='paymentFormError'>{formik.errors.address}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap widthHundred'>
        <input
          className='widthHundred'
          type='text'
          placeholder='*City'
          name='city'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.city}
        />
        {formik.touched.city && formik.errors.city ? (
          <p className='paymentFormError'>{formik.errors.city}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap'>
        <Select
          options={countrys}
          text='*Country'
          name='country'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        {formik.touched.country && formik.errors.country ? (
          <p className='paymentFormError'>{formik.errors.country}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap'>
        <Select
          options={states}
          text='*Region/State'
          name='regionState'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.regionState}
        />
        {formik.touched.regionState && formik.errors.regionState ? (
          <p className='paymentFormError'>{formik.errors.regionState}</p>
        ) : null}
      </div>
      <div className='paymentFormInputWrap'>
        <input
          className='postalCode'
          type='text'
          placeholder='*Postal code'
          name='postalCode'
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.postalCode}
        />
        {formik.touched.postalCode && formik.errors.postalCode ? (
          <p className='paymentFormError'>{formik.errors.postalCode}</p>
        ) : null}
      </div>

      <div className='titles widthHundred'>
        <h4 className='paymentMethodTitle'>Payment Method</h4>
        <span className='paymentMethodSecureText'>
          <img src={lock} alt='lock' /> All Transactions are secure and
          encrypted
        </span>
      </div>
      <div className='paymentMethodCardInfoWrapper'>
        <div className='paymentMethodSelection'>
          <div className='radioBtnWraper'>
            <div className='paymentFormInputWrap positionRelative'>
              <label htmlFor='creditCard' className='customRadioButton '>
                <input
                  className=''
                  type='radio'
                  id='creditCard'
                  name='paymentMethod'
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value='credicCard'
                />
                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                  <p className='paymentFormErrorMethodSelect'>
                    {formik.errors.paymentMethod}
                  </p>
                ) : null}

                <span className='checkMark'></span>
              </label>
            </div>
            <label className='radioBtnLable' htmlFor='creditCard'>
              Credit Card
            </label>
          </div>
          <div className='creditCardSvgsWrapper'>
            <img src={visa} alt='Visa' />
            <img src={mastercard} alt='Mastercard' />
            <img src={amex} alt='Amex' />
            <img src={discover} alt='Discover' />
            <img src={americanExpress} alt='American express' />
            <img src={maestro} alt='Maestro' />
          </div>
        </div>
        <div className='creditCardInfo'>
          <div className='paymentFormInputWrap widthHundred'>
            <input
              className='widthHundred'
              type='text'
              placeholder='Card number'
              name='cardNumber'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
            />
            {formik.touched.cardNumber && formik.errors.cardNumber ? (
              <p className='paymentFormError'>{formik.errors.cardNumber}</p>
            ) : null}
          </div>
          <div className='paymentFormInputWrap widthtwenty gap'>
            <input
              className='widthHundred'
              type='text'
              placeholder='MM/YY'
              name='cardMMYY'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cardMMYY}
            />
            {formik.touched.cardMMYY && formik.errors.cardMMYY ? (
              <p className='paymentFormError'>{formik.errors.cardMMYY}</p>
            ) : null}
          </div>
          <div className='paymentFormInputWrap widthtwenty'>
            <input
              className='widthHundred'
              type='text'
              placeholder='CVV'
              name='cardCVV'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cardCVV}
            />
            {formik.touched.cardCVV && formik.errors.cardCVV ? (
              <p className='paymentFormError'>{formik.errors.cardCVV}</p>
            ) : null}
          </div>
        </div>
      </div>
      <input
        type='submit'
        value='COMPLETE ORDER'
        className='widthHundred submitBtn'
      />
      {msgFromBackend && <p className='msgFromBackend'>{msgFromBackend}</p>}
      <div className='securedBySvgs'>
        <img src={norton} alt='Norton' />
        <img src={veriSign} alt='VeriSign' />
        <img src={mcAfee} alt='McAfee' />
        <img src={comodo} alt='Comodo' />
      </div>
    </form>
  );
};

export default PaymentForm;
