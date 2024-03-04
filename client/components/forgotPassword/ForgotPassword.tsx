import React from 'react';
import Link from "next/link";
import './forgotpassword.css';

const ForgotPassword = () => {

  return (
    <div className="form-container-forgot">
      <div className="logo-container-forgot">
        Forgot Password
      </div>

      <form className="form-forgot">
        <div className="form-group-forgot">
          <input type="text" id="email" name="email" placeholder="Enter your email" required />
        </div>

       <Link href='/twofactor'> <button className="form-submit-btn-forgot" type="submit">Send Email</button></Link>
      </form>

      <p className="signup-link-forgot">
        Don't have an account?<Link href="/signup" className="signup-link-forgot link-forgot"> Sign up</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;