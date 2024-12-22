import React, { useState, useEffect, useRef } from "react";
import styles from "../../pages/Authentication/authentication.style"
import { Link, useHistory } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { Input, Button, Typography, useMediaQuery, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from "react-redux"
import { signUp, removeEmailSignUpError } from "../../store/actions/authAction"
import { authErrorSelector, authIsLoadingSelector } from '../../store/selectors'
import validator from 'validator'
import { icons } from "../../constant"
import { toast } from 'react-toastify'

const SignUpForm = ({ isSignIn, setIsSignIn, references }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const authErrors = useSelector(authErrorSelector)
    const isLoading = useSelector(authIsLoadingSelector)

    const minWidth = useMediaQuery('(min-width:900px)');
    const isHide = (!minWidth && isSignIn);

    const [email, setEmail] = useState({
        value: "",
        error: undefined,
    })
    const [name, setName] = useState({
        value: "",
        error: undefined,
    })
    // const [phoneNumber, setPhoneNumber] = useState({
    //     value: "",
    //     error: undefined,
    // })
    // const [address, setAddress] = useState({
    //     value: "",
    //     error: undefined,
    // })
    // const [city, setCity] = useState({
    //     value: "",
    //     error: undefined,
    // })
    // const [country, setCountry] = useState({
    //     value: "",
    //     error: undefined,
    // })
    const [password1, setPassword1] = useState({
        value: "",
        error: undefined,
        showPassword: false,
    })
    const [password2, setPassword2] = useState({
        value: "",
        error: undefined,
        showPassword: false,
    })

    useEffect(() => {
        setEmail({ ...email, error: authErrors.emailSignUp })
    }, [authErrors.emailSignUp])

    const checkInputs = () => {
        let error = true
        if (validator.isEmail(email.value) === false) {
            setEmail({ ...email, error: "Email is invalid" })
            error = false
        }
        if (checkStrLength(name.value, 5, 20) === false) {
            setName({ ...name, error: "Username must be between 5 and 20 characters" })
            error = false
        }
        // if (checkStrLength(phoneNumber.value, 1, 100) === false) {
        //     setPhoneNumber({ ...phoneNumber, error: "Please fill in this field" })
        //     error = false
        // }
        // if (checkStrLength(address.value, 1, 100) === false) {
        //     setAddress({ ...address, error: "Please fill in this field" })
        //     error = false
        // }
        // if (checkStrLength(city.value, 1, 100) === false) {
        //     setCity({ ...city, error: "Please fill in this field" })
        //     error = false
        // }
        // if (checkStrLength(country.value, 1, 100) === false) {
        //     setCountry({ ...country, error: "Please fill in this field" })
        //     error = false
        // }
        if (checkStrLength(password1.value, 6, 25) === false) {
            setPassword1({ ...password1, error: "Password must be between 6 and 25 characters" })
            error = false
        }
        if (checkMatchPasswords(password1.value, password2.value) === false) {
            setPassword2({ ...password2, error: "Passwords don't match" })
            error = false
        }
        return error
    }
    const signUpSubmit = () => {
        if (password1.value === password2.value) {
            dispatch(signUp(email.value, name.value, password2.value, history))
        } else {
            toast.error('Passwords do not match')
        }
    }

    const checkStrLength = (str, start, end) => {
        if (str.length >= start && str.length <= end) return true
        else return false
    }

    const checkMatchPasswords = (password1, password2) => {
        if (password1 === password2) return true
        else return false
    }

    const isRedBorder = (type) => ({
        border: type ? ("1px red solid") : ("none"),
        borderRadius: '10px',
    })

    const removeEmailError = () => {
        if (authErrors.emailSignUp)
            dispatch(removeEmailSignUpError())
        else if (email.error)
            setEmail({ ...email, error: undefined })
    }

    const removeNameError = () => {
        if (name.error)
            setName({ ...name, error: undefined })
    }

    // const removePhoneNumberError = () => {
    //     if (phoneNumber.error)
    //         setPhoneNumber({ ...phoneNumber, error: undefined })
    // }

    // const removeAddressError = () => {
    //     if (address.error)
    //         setAddress({ ...address, error: undefined })
    // }

    // const removeCityError = () => {
    //     if (city.error)
    //         setCity({ ...city, error: undefined })
    // }

    // const removeCountryError = () => {
    //     if (country.error)
    //         setCountry({ ...country, error: undefined })
    // }

    const removePassword1Error = () => {
        if (password1.error)
            setPassword1({ ...password1, error: undefined })
    }

    const removePassword2Error = () => {
        if (password2.error)
            setPassword2({ ...password2, error: undefined })
    }

    const handleClickShowPassword1 = () => {
        setPassword1({
            ...password1,
            showPassword: !password1.showPassword,
        })
    }

    const handleClickShowPassword2 = () => {
        setPassword2({
            ...password2,
            showPassword: !password2.showPassword,
        })
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			signUpSubmit()
		}
	}

    if (isHide) return <></>;

    return (
        <Box sx={styles.formContainerRight} ref={references}>
            <Box sx={{ width: "100%" }}>
                <Typography sx={styles.title}>Tạo tài khoản
                </Typography>
                <Box component="div" style={styles.socialContainer}>
                    <Link to="#" style={styles.socialLink}><i className="fab fa-facebook-f"></i></Link>
                    <Link to="#" style={styles.socialLink}><i className="fab fa-google-plus-g"></i></Link>
                    <Link to="#" style={styles.socialLink}><i className="fab fa-linkedin-in"></i></Link>
                </Box>
                <Typography component="div" sx={styles.subTitle}>hoặc sử dụng email của bạn để đăng ký
                </Typography>

                <Input
                    sx={isRedBorder(email.error)}
                    value={email.value}
                    onChange={(e) => setEmail({ ...email, value: e.target.value })}
                    onClick={removeEmailError}
                    onKeyDown={handleKeyDown}
                    type="email"
                    name="email"
                    placeholder="Email"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{email.error}</Typography>

                <Input
                    sx={isRedBorder(name.error)}
                    value={name.value}
                    onChange={(e) => setName({ ...name, value: e.target.value })}
                    onClick={removeNameError}
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="name"
                    placeholder="Họ và tên"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{name.error}</Typography>

                {/* <Input
                    sx={isRedBorder(phoneNumber.error)}
                    value={phoneNumber.value}
                    onChange={(e) => setPhoneNumber({ ...phoneNumber, value: e.target.value })}
                    onClick={removePhoneNumberError}
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="phoneNumber"
                    placeholder="Số điện thoại"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{phoneNumber.error}</Typography>

                <Input
                    sx={isRedBorder(address.error)}
                    value={address.value}
                    onChange={(e) => setAddress({ ...address, value: e.target.value })}
                    onClick={removeAddressError}
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{address.error}</Typography>

                <Input
                    sx={isRedBorder(city.error)}
                    value={city.value}
                    onChange={(e) => setCity({ ...city, value: e.target.value })}
                    onClick={removeCityError}
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="city"
                    placeholder="Tỉnh/thành phố"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{city.error}</Typography>

                <Input
                    sx={isRedBorder(country.error)}
                    value={country.value}
                    onChange={(e) => setCountry({ ...country, value: e.target.value })}
                    onClick={removeCountryError}
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="country"
                    placeholder="Quốc gia"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: styles.input }}
                />
                <Typography component="div" sx={styles.errorMsg}>{country.error}</Typography> */}

                <Input
                    sx={{ ...styles.input, ...isRedBorder(password1.error) }}
                    value={password1.value}
                    onChange={(e) => setPassword1({ ...password1, value: e.target.value })}
                    onClick={removePassword1Error}
                    onKeyDown={handleKeyDown}
                    type={password1.showPassword ? 'text' : 'password'}
                    //inputRef={inputRef}
                    placeholder="Mật khẩu"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: { padding: 0 } }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword1}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {password1.showPassword ? <icons.HideIcon style={styles.showPWIcon} /> : <icons.ShowIcon style={styles.showPWIcon} />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Typography sx={styles.errorMsg}>{password1.error}</Typography>

                <Input
                    sx={{ ...styles.input, ...isRedBorder(password2.error) }}
                    value={password2.value}
                    onChange={(e) => setPassword2({ ...password2, value: e.target.value })}
                    onClick={removePassword2Error}
                    onKeyDown={handleKeyDown}

                    type={password2.showPassword ? 'text' : 'password'}
                    //inputRef={inputRef}
                    placeholder="Xác nhận mật khẩu"
                    disableUnderline
                    fullWidth
                    inputProps={{ style: { padding: 0 } }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {password2.showPassword ? <icons.HideIcon style={styles.showPWIcon} /> : <icons.ShowIcon style={styles.showPWIcon} />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Typography sx={styles.errorMsg}>{password2.error}</Typography>

                {
                    (!isSignIn && !minWidth) &&
                    <Button onClick={() => setIsSignIn(true)}
                        sx={styles.switch}>
                        Already have an account? Sign in
                    </Button>
                }
                <Box sx={styles.centerBox}>
                    <Link style={styles.back} to="/"><i className="bi bi-arrow-left"></i>&nbsp; Quay về trang chủ</Link>
                </Box>
                <Box sx={styles.centerBox}>
                    <LoadingButton
                        onClick={signUpSubmit}
                        sx={styles.mainButton}
                        variant="contained"
                        // loading={isLoading}
                        loadingIndicator={<CircularProgress sx={styles.loadingIndicator} size={18} />}
                    >Đăng ký
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    )
}

export default SignUpForm;
