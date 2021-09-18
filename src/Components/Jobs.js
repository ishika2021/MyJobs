import React, { useEffect, useState } from 'react'
import './Jobs.css'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Modal from '@mui/material/Modal';
import { database } from '../Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function Jobs({ job ,userData,page }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [applicantArr,setapplicantArr]=useState(null);
    useEffect(async()=>{
        let arr=[];
        await database.users.onSnapshot(querySnapshot=>{
                arr=[];
            querySnapshot.forEach((doc)=>{
                if(doc.data().cdType=="candidate"){
                    let data={
                        ...doc.data()
                    }
                    arr.push(data);
                }
            })
            setapplicantArr(arr);
        })
    },[])
    return (
        <div className="JobContainer">
            <h5 className="jTitle">{job.jTitle}</h5>
            <p className="jDesc">{job.desc}</p>
            <div className="locationContainer">
                <LocationOnIcon style={{ color: '#43AFFF',marginLeft:'15px' }} />
                <span className="jLocation">{job.location}</span>
                <button className="btn" onClick={handleOpen} style={{backgroundColor: '#EDF6FF',color:'#4D618E',border:'none',marginLeft:'15px'}} >View Application</button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="ApplicationContainer">
                    <h4 style={{marginLeft:'10px'}}>Applicants for this job</h4>
                    <hr style={{margin:0}} ></hr>
                    <span style={{marginLeft:'10px',fontSize:'14px'}} >{applicantArr?.length} applicants for this job</span>
                    <div className="allApplicationBox">
                        {
                            userData==null || applicantArr==null?<CircularProgress color="success" />:
                            <>
                                {
                                    applicantArr.length==0?<>0 applicants for this job</>:
                                    <> 
                                        {
                                            applicantArr.map(applicant=>(
                                                <div className="applicantBox">
                                                    <div className="box1">
                                                        <Avatar style={{margin:'5px',background:'#43AFFF33',color:'#303F60'}} >{applicant.name.charAt(0).toUpperCase()}</Avatar>
                                                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                                                            <span style={{fontWeight:'bold'}}>{applicant.name}</span>
                                                            <span>{applicant.email}</span>
                                                        </div>
                                                    </div>
                                                    <div className="box2">
                                                        <strong>Skills</strong>
                                                        <p style={{marginTop:'5px'}}>{applicant.skills}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                }
                            </>
                        }
                    </div>
                </div>
            </Modal>
        </div>

    )
}

export default Jobs
