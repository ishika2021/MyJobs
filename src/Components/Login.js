import React, { useContext, useState } from 'react'
import './Login.css'
import {useHistory} from 'react-router';
import {AuthContext} from '../Context/AuthProvider'
function Login() {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {login}=useContext(AuthContext);
    const [error,setError]=useState('');
    const handleLogin=async()=>{
        try{
            let res=await login(email,password);
            console.log("User Logged In");
            history.push('/alljobs');

        }catch(err){
            setError(err.message);
            setTimeout(()=>{setError('')},2000);
        }

    }
    return (
        <div className="LoginContainer">
            <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF',fontSize:'22px' }}>Jobs</span></div>
            </div>
            <div className="Top"></div>
            <div className="LoginBox">
                <h6>Login</h6>
                <div className="AllInputBox">
                    <div className="InputBox">
                        <span>Email Address</span>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email" />
                    </div>
                    <div className="InputBox">
                        <div>
                            <span>Password</span>
                            <span style={{ fontFamily: 'Helvetica Neue', color: '#43AFFF', float: 'right', fontSize: '14px', fontWeight: 'bold',cursor:'pointer' }} onClick={()=>{history.push('/forgotpassword')}} >Forgot your password?</span>
                        </div>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" />
                    </div>
                </div>
                {error!=''?<p className="error">{error}</p>:<></>}
                <button className="login" onClick={handleLogin}>Login</button>
                <div className="newAccount">
                    <span style={{fontSize:'16px'}}>New to MyJobs?
                    <a style={{fontSize:'16px',color:'#43AFFF',fontWeight:'bold',cursor:'pointer'}} onClick={()=>{history.push('/signup')}}> Create an account</a></span>
                </div>
            </div>
        </div>
    )
}

export default Login
