import React, { useState } from 'react'
import './Forgot.css';
import {useHistory} from 'react-router-dom';
// import {AuthContext} from '../Context/AuthProvider';
function Forgot() {
    const [email,setEmail]=useState('');
    const history=useHistory();
    const [error,setError]=useState('');
    const handleForgotPassword=()=>{
        if(email!=''){
            history.push('/resetpassword')
        }else{
            setError("Please Enter Email");
            setTimeout(()=>{setError('')},2000);
        }
    }
    return (
        <div className="ForgotContainer">
        <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF',fontSize:'22px' }}>Jobs</span></div>
            </div>
            <div className="Top"></div>
        <div className="ForgotBox">
            <h4>Forgot your password?</h4>
            <p>Enter the email associated with your account and we’ll send you instructions to reset your password.</p>
            <div className="InputBox">
                <span>Email Address</span>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
            </div>
            {error!=''?<p className="error">{error}</p>:<></>}
            <button className="btn" onClick={handleForgotPassword} style={{cursor:'pointer'}} >Submit</button>
        </div>
        </div>
    )
}

export default Forgot
