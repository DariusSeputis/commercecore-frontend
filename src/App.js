import React, { useState } from 'react';
import LetfSide from './components/leftSide/LetfSide';
import RightSide from './components/rightSide/RightSide';

import './App.css';

export const ChosenProductContext = React.createContext();

function App() {
  const [selectedProductConfirmed, setSelectedProductConfirmed] = useState({
    productCount: 1,
  });
  return (
    <ChosenProductContext.Provider
      value={{ selectedProductConfirmed, setSelectedProductConfirmed }}
    >
      <div className='paymentPage'>
        <LetfSide />
        <RightSide />
      </div>
    </ChosenProductContext.Provider>
  );
}

export default App;
