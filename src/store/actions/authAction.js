import ActionType from './actionType'
import { getUserProfileApi, signInApi, signUpApi } from '../../api/authApi'
import { getCart, clearCartUI, getCartQuantity } from "../actions/cartAction"
import { encryptData } from '../../constant/utils'
import { toast } from 'react-toastify'

const signIn = (email, password, history) => {

    return dispatch => {
        dispatch({ type: ActionType.START_LOGIN })
        signInApi(email, password)
            .then(response => {
                const data = response.data;
                if (response.status === 200) {
                    // dispatch({ type: ActionType.LOGIN_SUCCESS, data: data })
                    
                    localStorage.setItem("accessToken", data.accessToken);
                    let accessToken = localStorage.getItem("accessToken");
                    console.log("accessToken from signIn:", accessToken);

                    dispatch(getCartQuantity(data.accessToken));
                    getUserProfileApi(data.accessToken).then(response => {
                        localStorage.setItem('userName', response.data.name);
                        dispatch({ type: ActionType.LOGIN_SUCCESS, data: response.data });
                    })

                    // updateUserVisitAPI();

                    let token = encryptData(data.accessToken);

                    sessionStorage.setItem("userInfo", token);
                    let userInfo = sessionStorage.getItem("userInfo");
                    console.log("userInfo from signIn:", userInfo);
                    history.push("/");
                    setTimeout(()=> {
                        toast.success('Đăng nhập thành công');
                    }, 500);
                }
                else
                    dispatch({ type: ActionType.SIGNIN_FAIL, data: data });
            })
            .catch(error => {
                if (error.response) {
                    toast.error(`${error.response.data.message || 'Server Error'}`);
                  } else if (error.request) {
                    toast.error('No response received from server');
                  } else {
                    toast.error(`Error: ${error.message}`);
                  }
            }
            )
    }
}

const signUp = (email, name, phoneNumber, address, city, country, password, history) => {
    return dispatch => {
        dispatch({ type: ActionType.START_LOGIN })
        signUpApi(email, name, phoneNumber, address, city, country, password)
            .then(response => {
                const data = response.data;
                if (response.status === 201) {
                    /*dispatch({ type: ActionType.LOGIN_SUCCESS, data: data })

                    let token = encryptData(data);

                    sessionStorage.setItem("userInfo", token);
                    dispatch(getCart());
                    history.push("/");*/
                    // alert('Registration successful! Please login to use our services')
                    toast.success("Đăng ký thành công. Vui lòng đăng nhập để sử dụng dịch vụ")
                    window.location.href = '/authentication';
                }
                else
                    dispatch({ type: ActionType.SIGNUP_FAIL, data: data });
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }
}

const sessionLogin = (data) => {
    return dispatch => {
        dispatch({ type: ActionType.LOGIN_SUCCESS, data: data })
    }
}

const removeEmailError = () => {
    return dispatch => {
        dispatch({ type: ActionType.REMOVE_EMAIL_ERROR })
    }
}

const removePasswordError = () => {
    return dispatch => {
        dispatch({ type: ActionType.REMOVE_PASSWORD_ERROR })
    }
}

const removeEmailSignUpError = () => {
    return dispatch => {
        dispatch({ type: ActionType.REMOVE_EMAIL_SIGNUP_ERROR })
    }
}

const logOut = (history) => {
    return dispatch => {
        dispatch(clearCartUI());
        dispatch({ type: ActionType.LOGOUT })
        sessionStorage.removeItem("userInfo")
        localStorage.removeItem("accessToken")
        localStorage.removeItem("userName")
        localStorage.removeItem("cartQuantity")

        if (history) {
            history.push("/")
            toast.success('Đăng xuất thành công');
        }
    }
}

const showAuthError = () => {
    return dispatch => {
        dispatch({ type: ActionType.SHOW_AUTH_ERROR_NOTI });
    }
}


export {
    signIn,
    signUp,
    sessionLogin,
    removeEmailError,
    removePasswordError,
    removeEmailSignUpError,
    showAuthError,
    logOut
};