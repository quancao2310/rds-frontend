import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Input, Button, Slide, Fade, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../store/selectors'
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import styles from './authentication.style';
import { Box } from '@mui/system';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Authentication = () => {
    const user = useSelector(userInfoSelector)
    const history = useHistory()
    const accessToken = localStorage.getItem('accessToken')
    
    if(accessToken) {
        history.push("/");
    }

    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <Box sx={styles.main}>
            <Box sx={styles.container}>
                <SignInForm
                    isSignIn={isSignIn}
                    setIsSignIn={setIsSignIn}
                    references={leftRef}
                />

                <SignUpForm
                    isSignIn={isSignIn}
                    setIsSignIn={setIsSignIn}
                    references={rightRef}
                />

                <Slide
                    appear={false}
                    direction="right"
                    in={isSignIn}
                    container={rightRef.current}
                    timeout={500}
                >
                    <Box sx={styles.overlayRight}>
                        <Typography variant="h1" sx={styles.overlayTitle}>Chào mừng đến với Regional Delicacy Shop!</Typography>
                        <Typography sx={styles.overlaySubTitle} variant="p">Nếu bạn chưa có tài khoản, hãy dành chút thời gian để đăng ký</Typography>
                        <Button
                            onClick={() => setIsSignIn(false)}
                            sx={styles.overlayButton} variant="outlined">Đăng ký</Button>
                    </Box>
                </Slide>

                <Fade
                    in={!isSignIn}
                    timeout={570}
                >
                    <Box sx={styles.overlayLeft}>
                        <Typography variant="h1" sx={styles.overlayTitle}>Chào mừng đến với Regional Delicacy Shop!
                        </Typography>
                        <Typography sx={styles.overlaySubTitle} variant="p">Nếu bạn đã có tài khoản, đăng nhập ngay

                        </Typography>
                        <Button
                            onClick={() => setIsSignIn(true)}
                            sx={styles.overlayButton} variant="outlined">Đăng nhập</Button>
                    </Box>
                </Fade>
            </Box>
            <ToastContainer/>
        </Box>
    )
}

export default Authentication;
