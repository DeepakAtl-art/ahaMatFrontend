import React from 'react'

function Verification() {
    const inputs = Array(6).fill(0).map(() => useRef(null));

    const handleChange = (e, index) => {
      const value = e.target.value;
      if (/^[0-9]$/.test(value)) {
        if (index < inputs.length - 1) {
          inputs[index + 1].current.focus();
        }
      } else {
        e.target.value = '';
      }
    };
  
    return (
      <div className="verification-container">
        <div className="verification-card">
          <button className="back-button">←</button>
          <h1 className="verification-title">VERIFICATION</h1>
          <p className="verification-subtitle">
            CHECK YOUR EMAIL. WE'VE SENT YOU THE PIN AT YOUR EMAIL.
          </p>
  
          <div className="pin-inputs">
            {inputs.map((ref, index) => (
              <input
                key={index}
                maxLength="1"
                ref={ref}
                className="pin-input"
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
  
          <p className="code-info">Did you receive any code?</p>
          <button className="verify-button">Verify</button>
        </div>
      </div>
    );
}

export default Verification
