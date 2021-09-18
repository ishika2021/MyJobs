import React, { useState } from 'react'
import './Home.css';

import {useHistory} from 'react-router-dom';
function Home() {
    const[btnType,setBtnType]=useState("login");
    const history=useHistory();
    return (
        <div className="HomeContainer">
            <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF',fontSize:'22px' }}>Jobs</span></div>
                <button className="loginBtn" onClick={()=>{history.push('/login')}}>Login/Signup</button>

            </div>
            <div className="Top">
                <div className="bigHeading">Welcome to <span style={{fontWeight:'bold',fontSize:'60px'}}>My<span style={{ color: '#43AFFF',fontSize:'60px' }}>Jobs</span></span></div>
                <button className="getStartBtn" onClick={()=>{history.push('/signup')}}>Get Started</button>
                <div className="bigImage"></div>
            </div>
            <div className="Bottom">
                <div className="whyUsContainer">
                    <h6>Why Us</h6>
                     <div className="card">
                         <h5 className="cardHeading">Get more visibility</h5>
                         <p className="cardContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                     </div>
                     <div className="card">
                         <h5 className="cardHeading">Organize your candidates</h5>
                         <p className="cardContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                     </div>
                     <div className="card">
                         <h5 className="cardHeading">Verify their abilities</h5>
                         <p className="cardContent">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                     </div>
                     
                </div>
                <div className="partnerCompanyContainer">
                    <h6>Companies Who Trust Us</h6>
                    <div className="allCompanies"></div>
                </div>
            </div>
        </div>
    )
}

export default Home
