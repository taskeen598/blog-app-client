import React from 'react';
import Link from "next/link";
import './twoFactor.css';

const TwoFactor = () => {

  return (
    <form className="form-factor">
      <div className="info-factor">
        <span className="title-factor">Two-Factor Verification</span>
        <p className="description-factor">Enter the 4-Digit Code</p>
      </div>

      <div className="input-fields-factor">
        <input placeholder="" type="tel"  />
        <input placeholder="" type="tel"  />
        <input placeholder="" type="tel"  />
        <input placeholder="" type="tel"  />
      </div>

      <div className="action-btns-factor">
        <a className="verify-factor" href="#">Verify</a>
        <a className="clear-factor" href="#">Clear</a>
      </div>
    </form>
  );
};

export default TwoFactor;