import React from 'react';

const Select = ({ options, text, onChange, name, value }) => {
  return (
    <div className='positionRelative gap'>
      <span className='selectText positionAbsolute'>{text}</span>
      <select onChange={onChange} name={name} value={value}>
        <option>Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
