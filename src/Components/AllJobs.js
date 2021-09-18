import React from 'react'
import './AllJobs.css';
import Avatar from '@mui/material/Avatar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import HomeIcon from '@mui/icons-material/Home';
import { database } from '../Firebase';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Modal from '@mui/material/Modal';
import Jobs from './Jobs';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function AllJobs() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { currentUser, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [jTitle, setJTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [page, setPage] = useState("1");
    const history = useHistory();
    const [postArr,setPostArr]=useState(null);
    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => setOpenModal(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = async () => {
        setAnchorEl(null);
        await logout();
        history.push('/');
    }
    const handlePost = async () => {
        handleModalClose();
        let id = uuidv4();
        let obj = {
            jTitle: jTitle,
            desc: description,
            location: location,
            id: id,
        }
        await database.users.doc(userData?.uid).update({
            jobIds: [...userData.jobIds, obj]
        })

        setJTitle('');
        setDescription('');
        setLocation('');
       
    }
    
    useEffect(() => {
        console.log(currentUser.uid);
        const unsub = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
            const firstIdx=(page-1)*2;
            const lastIdx=firstIdx+2;
            let arr=userData?.jobIds?.slice(firstIdx,lastIdx);
            setPostArr(doc.data().jobIds.slice(firstIdx,lastIdx));
        })
   
    }, [currentUser]);
    useEffect(()=>{
        const firstIdx=(page-1)*2;
            const lastIdx=firstIdx+2;
            let arr=userData?.jobIds?.slice(firstIdx,lastIdx);
            setPostArr(arr);
    },[page])
    
    
    return (
        <div className="AllJobsContainer">
            <div className="Navigation">
                <div className="logo">My<span style={{ color: '#43AFFF', fontSize: '22px' }}>Jobs</span></div>
                <KeyboardArrowDownIcon style={{ float: 'right', marginRight: '20px', marginTop: '25px', color: '#FFFFFF' }} onClick={handleClick} />
                <Avatar style={{ float: 'right', marginRight: '10px', marginTop: '15px', background: '#EDF6FF', color: '#303F60' }}>R</Avatar>
                <span className="postJobText" onClick={() => setOpenModal(true)} >Post A Job</span>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
            <div className="Top" style={{ height: '140px' }} >
                <span className="HomeText">
                    <HomeIcon style={{ color: '#fff', marginLeft: '50px', marginTop: '10px' }} /> Home
                </span>
                <span className="PostedByYouText">Jobs Posted By You</span>
            </div>
            {
                <div className="Middle">
                    {userData == null ? <CircularProgress color="success" /> : <>{userData?.jobIds.length == 0 ? <>
                        <AssignmentIcon fontSize="150px" className="icon" />
                        <div className="addJobText">Your posted jobs will show here!</div>
                        <button className="btn" onClick={handleModalOpen} >Post a Job</button>

                    </> : <>
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'-200px'}} >
                            <div className="JobBoxContainer">
                            {    
                                postArr?.map((job) => (
                                    <Jobs job={job} userData={userData}/>
                                ))
                                
                            }
                            </div>
                            <Stack spacing={2} style={{marginTop:'150px'}} >
                            <Pagination count={3} onChange={(e,val)=> setPage(val)}  variant="outlined" shape="rounded" />
                            </Stack>
                        </div>
                    </>
                    }
                    </>}
                </div>
            }
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="ForgotBox" style={{ height: '490px', width: '557px' }}>
                    <h4 style={{ fontSize: '22px' }}>Post a Job</h4>
                    <div className="InputBox">
                        <span>Job Title</span>
                        <input value={jTitle} onChange={(e) => { setJTitle(e.target.value) }} style={{ border: '1px solid #FF333380' }} placeholder="Enter job title" />
                    </div>
                    <div className="InputBox" style={{ height: '110px' }}>
                        <span>Description</span>
                        <input value={description} onChange={(e) => { setDescription(e.target.value) }} style={{ border: '1px solid #FF333380' }} style={{ height: '110px', border: '1px solid #FF333380' }} placeholder="Enter description" />
                    </div>
                    <div className="InputBox">
                        <span>Location</span>
                        <input value={location} onChange={(e) => { setLocation(e.target.value) }} style={{ border: '1px solid #FF333380' }} placeholder="Enter job location" />
                    </div>
                    <button className="btn" onClick={handlePost} style={{ top: '370px' }}>Post</button>
                </div>
            </Modal>
        </div>
    )
}

export default AllJobs
