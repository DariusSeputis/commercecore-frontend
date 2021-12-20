import React, { useContext } from 'react';
import './RightSide.css';
import tripple from '../../images/tripple.png';
import fitGuarantee from '../../svg/fitGuarantee.svg';

import { ChosenProductContext } from '../../App.js';

const RightSide = () => {
  // CONTEXT
  const { selectedProductConfirmed, setSelectedProductConfirmed } =
    useContext(ChosenProductContext);
  return (
    <div className='rightSide'>
      <div className='productWrapperR'>
        <div className='productImgNamewraperR'>
          <div className='productImgWrapR'>
            <img className='productImgR' src={tripple} alt='triple' />
          </div>
          <span className='productQuantityR'>
            {selectedProductConfirmed.productCount}x
          </span>
          <span className='productNameR'>
            {selectedProductConfirmed.product}
          </span>
        </div>
        <div className='productPriceR'>
          <span>&#36;{selectedProductConfirmed.price}</span>
        </div>
      </div>
      <div className='separatorR'></div>
      <div className='totalR'>
        <span className='totalR__total'>Total</span>
        <div className='totalPriceWrap'>
          <span className='totalPriceCurrency'>USD</span>
          <span className='totalPriceRNumber'>
            &#36;{selectedProductConfirmed.price}
          </span>
        </div>
      </div>
      <div className='fitGuaranteeR'>
        <div className='svgTitleWrapper'>
          <img src={fitGuarantee} alt='fit guarantee' />
          <span className='fitGuaranteeR__title'>60-DAY FIT GUARANTEE</span>
        </div>
        <p className='fitGuaranteeR__text'>
          Either it doesn’t fit or simply you don’t like it You can return it
          within 60 days for a full refund. No questions asked.
        </p>
      </div>
    </div>
  );
};

export default RightSide;
