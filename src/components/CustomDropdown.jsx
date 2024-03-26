import React, { useState } from 'react';
// import './CustomDropdown.css'; 

const CustomDropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (value) => {
    setSelectedOption(value);
    // Handle selection here if needed
  };

  return (
    <div className="custom-dropdown">
      {/* <div className="selected-option">{selectedOption || 'Select an option'}</div> */}
      <select className="options-list">
        {options.map((option, index) => (
          <option key={index} onClick={() => handleOptionClick(option.value)}>
            <img src={option.icon} alt={option.text} className="option-icon" />
            <span className="option-text">{option.text}</span>
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomDropdown;
