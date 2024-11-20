import ActionType from './actionType'
import { signInApi, signUpApi, updateUserVisitAPI } from '../../api/authApi'
import { getCart, clearCartUI } from "../actions/cartAction"
import { encryptData } from '../../constant/utils'
const signIn = (email, password, history) => {


    return dispatch => {
        dispatch({ type: ActionType.START_LOGIN })
        signInApi(email, password)
            .then(response => {
                const data = response.data;
                if (response.status === 200) {
                    alert('Login successful!');
                    dispatch({ type: ActionType.LOGIN_SUCCESS, data: data })
                    dispatch(getCart());

                    updateUserVisitAPI();

                    //let token = encryptData(data);

                    sessionStorage.setItem('accessToken', response.data.accessToken);
                    let accessToken = sessionStorage.getItem('accessToken');
                    console.log(accessToken);
                    history.push("/");
                }
                else
                    dispatch({ type: ActionType.SIGNIN_FAIL, data: data });
            })
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
                    alert('Registration successful! Please login to use our services')
                    window.location.href = '/authentication';
                }
                else
                    dispatch({ type: ActionType.SIGNUP_FAIL, data: data });
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
        sessionStorage.removeItem("accessToken")

        if (history) {
            history.push("/")
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