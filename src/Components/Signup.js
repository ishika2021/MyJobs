import React, { useContext, useState } from 'react';
import {AuthContext} from '../Context/AuthProvider';
import { database } from '../Firebase';
import { useHistory } from 'react-router';
import "./Signup.css"
function Signup() {
    const[cdType,setCdType]=useState("recruiter");
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPass,setConfirmPass]=useState('');
    const [skills,setSkills]=useState('');
    const [error,setError]=useState('');
    const {signup}=useContext(AuthContext);
    const history=useHistory();
    const handleSignup= async()=>{
        try{
            if(name==''||email==''||password==''||confirmPass==''||skills==''||cdType==''){
                setError('All fields are mandatory');
                setTimeout(()=>{setError('')},2000);
                return;
            }
            if(password!=confirmPass){
                setError('Both passwords must be same');
                setTimeout(()=>{setError('')},2000);
                return;
            }
            let res=await signup(email,password);
            let uid=res.user.uid;
            await database.users.doc(uid).set({
                cdType:cdType,
                name:name,
                email:email,
                skills:skills,
                createdAt:database.getCurrentTimeStamp(),
                jobIds:[],
                uid:uid
            })
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPass('');
            setSkills('');
            history.push('/login');

        }catch(err){
            setError(err.message);
            setTimeout(()=>{setError('')},2000);
        }
        
    }
    return (
        <div className="SignUpContainer">
        <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF',fontSize:'22px' }}>Jobs</span></div>
            </div>
            <div className="Top"></div>
       
        <div className="SignUpBox">
            <div className="section1">
                <h4>Signup</h4>
                <span>I'm a'</span>
                <div>
                    <button className="btn" onClick={()=>{setCdType("recruiter")}}>Recruiter</button>
                    <button className="btn" style={{background:'#E8E8E833',color:'black',border:'1px solid #C6C6C6'}} onClick={()=>{setCdType("candidate")}}>Candidate</button>
                </div>
            </div>
            <div className="InputBox">
                <span>Full Name</span>
                <input type="text" placeholder="Enter your full name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="InputBox">
                <span>Email Address</span>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="passwordBox">
                <div className="InputBox">
                    <span>Create Password</span>
                    <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="InputBox">
                    <span>Confirm Password</span>
                    <input type="password" placeholder="Enter your password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} />
                    
                </div>
            </div>
            <div className="InputBox">
                <span>Skills</span>
                <input type="text" placeholder="Enter comma separated skills" value={skills} onChange={(e)=>setSkills(e.target.value)} />
            </div>
            {
                error!=''?<p className="error">{error}</p>:<></>
            }
            <button className="btn" onClick={handleSignup}>Signup</button>
            <div className="haveAccount">
                    <span style={{fontSize:'16px'}}>Have an account?
                    <a style={{fontSize:'16px',color:'#43AFFF',fontWeight:'bold',cursor:'pointer'}} onClick={()=>{history.push('/login')}} > Login</a></span>
            </div>
        </div>
        </div>
    )
}

export default Signup
