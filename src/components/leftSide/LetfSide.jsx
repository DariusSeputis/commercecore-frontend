import React from 'react';
import PaymentForm from '../form/PaymentForm';
import Product from '../product/Product';
import './LeftSide.css';

const LetfSide = () => {
  return (
    <div className='leftSide'>
      <div className='leftSideWrappers'>
        <span className='leftSideTitles leftSideTitleOne'>VARIANTS</span>
        <Product />
      </div>
      <div className='leftSideWrappers'>
        <span className='leftSideTitles leftSideTitleTwo'>
          PAYMENT AND SHIPPING
        </span>
        <PaymentForm />
      </div>
    </div>
  );
};

export default LetfSide;
