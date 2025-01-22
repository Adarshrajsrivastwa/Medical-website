
import React, { useState } from 'react';

function PhoneNumber() {
  const [countryCode, setCountryCode] = useState("+91"); 

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  return (
    <div className="phone-number">
      <div className="country-code-selector">
        <span className="star">*</span>
        <select value={countryCode} onChange={handleCountryCodeChange}>
          <option value="+91">+91</option> 
          {/* Keep other options if needed */}
          <option value="+1">+1</option>
          <option value="+44">+44</option>
        </select>
      </div>
      <div className="phone-number-input">
        <input type="text" placeholder=" (91) 12345 - 12345" />
      </div>
    </div>
  );
}

export default PhoneNumber;
