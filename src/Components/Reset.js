import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';
function Reset() {
    const [password,setPassword]=useState('');
    const [confirmPass,setConfirmPass]=useState('');
    const [error,setError]=useState('');
    const history=useHistory();
    const handleResetClick=()=>{
        console.log("yess");
        if(password==''||confirmPass==''){
            setError("All fields are mandatory");
            setTimeout(()=>{setError('')},2000);
            return;
        }
        if(password!=confirmPass){
            setError("Both passwords must be same");
            setTimeout(()=>{setError('')},2000);
            return;
        }
        setPassword('');
        setConfirmPass('');
        history.push('/login');
    }
    return (
        <div className="ForgotContainer">
        <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF',fontSize:'22px' }}>Jobs</span></div>
            </div>
            <div className="Top"></div>
        <div className="ForgotBox" style={{height:'360px',}}>
            <h4 style={{fontSize:'22px'}}>Reset Your Password</h4>
            <h6 style={{fontSize:'14px',marginTop:'100px',marginLeft:'37px'}}>Enter your new password below.</h6>
            <div className="InputBox">
                <span>New password</span>
                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" />
            </div>
            <div className="InputBox">
                <span>Confirm new password</span>
                <input type="password" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}} placeholder="Enter your password" />
            </div>
            {error!=''?<p className="error">{error}</p>:<></>}
            <button className="btn" style={{marginTop:'50px'}} onClick={handleResetClick} >Reset</button>
        </div>
        </div>
    )
}

export default Reset
