import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';

import { ChosenProductContext } from '../../App.js';

// react icons
import { MdExpandLess, MdExpandMore } from 'react-icons/md';

// Images would live in S3 or .. (not in front end)
import single from '../../images/single.png';
import tripple from '../../images/tripple.png';

const Product = () => {
  // CONTEXT
  const { selectedProductConfirmed, setSelectedProductConfirmed } =
    useContext(ChosenProductContext);
  const [products, setProducts] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  // const [selectedProductConfirmed, setSelectedProductConfirmed] = useState({
  //   productCount: 1,
  // });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [changeIcon, setChangeIcon] = useState(
    <MdExpandMore className='chngeIcon positionAbsolute' />
  );

  // its probably dumbest way to do it but here we are
  const [firstSelect, setFirstSelect] = useState('');
  const [secondSelect, setSecondSelect] = useState('');
  const [thirdSelect, setThirdSelect] = useState('');

  // click handlers
  const openCloaseSelect = () => {
    setOpen(!open);
    open
      ? setChangeIcon(<MdExpandMore className='chngeIcon positionAbsolute' />)
      : setChangeIcon(<MdExpandLess className='chngeIcon positionAbsolute' />);
  };

  // side effects

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/products')
      .then((res) => {
        setProducts(res.data);
        const fetchedProductOne = res.data.products[0];
        setSelectedProductConfirmed({
          ...selectedProductConfirmed,
          ...fetchedProductOne,
        });
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return loading ? (
    <span className='message'>Loading..</span>
  ) : error ? (
    <span className='message'>Failed to fetch data</span>
  ) : (
    <div className='variantsSelect'>
      <div className='selectedProduct' onClick={openCloaseSelect}>
        <div className='productWrapper'>
          <div className='productImgWrap'>
            <img className='' src={tripple} alt='bla' />
          </div>
          <span className='productQuantity'>
            {selectedProductConfirmed.productCount}x
          </span>
          <span className='productName'>
            {selectedProductConfirmed.product}
          </span>
        </div>
        <div className='changeWrap positionRelative'>
          <span className='selectChange'>Change</span>
          {changeIcon}
        </div>
      </div>
      {open ? (
        <>
          <div className='separator'></div>
          <div
            className='productWrapper'
            onClick={() => {
              setSelectedProduct({
                product: 'CoreProduct',
                price: 19.99,
                productCount: 1,
              });
              setFirstSelect('selected');
              setSecondSelect('');
              setThirdSelect('');
            }}
          >
            <div className='productImgName'>
              <div className={`productImgWrap ${firstSelect}`}>
                <img className='productImg' src={single} alt='bla' />
              </div>
              <span className='productQuantity'>1x</span>
              <span className='productName'>
                {products.products[0].product}
              </span>
            </div>
            <div className='productPrice'>
              <span>&#36;{products.products[0].price}</span>
            </div>
          </div>
          <div
            className='productWrapper'
            onClick={() => {
              setSelectedProduct({
                product: 'CoreProduct',
                price: 29.99,
                productCount: 2,
              });
              setFirstSelect('');
              setSecondSelect('selected');
              setThirdSelect('');
            }}
          >
            <div className='productImgName'>
              <div className={`productImgWrap ${secondSelect}`}>
                <img className='productImg' src={single} alt='bla' />
              </div>
              <span className='productQuantity'>2x</span>
              <span className='productName'>
                {products.products[0].product}
              </span>
            </div>
            <div className='productPrice'>
              <span>
                &#36;
                {(
                  products.products[0].price + products.products[0].plusOnePrice
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className='productWrapper'
            onClick={() => {
              setSelectedProduct({
                product: 'CoreProduct',
                price: 39.99,
                productCount: 3,
              });
              setFirstSelect('');
              setSecondSelect('');
              setThirdSelect('selected');
            }}
          >
            <div className='productImgName'>
              <div className={`productImgWrap ${thirdSelect}`}>
                <img className='productImg' src={single} alt='bla' />
              </div>
              <span className='productQuantity'>3x</span>
              <span className='productName'>
                {products.products[0].product}
              </span>
            </div>
            <div className='productPrice'>
              <span>
                &#36;
                {(
                  products.products[0].price +
                  products.products[0].plusOnePrice +
                  products.products[0].plusOnePrice
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <div
            className='saveChangesBtn'
            onClick={() => {
              setSelectedProductConfirmed(selectedProduct);
              openCloaseSelect();
            }}
          >
            <span>SAVE CHANGES</span>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Product;
