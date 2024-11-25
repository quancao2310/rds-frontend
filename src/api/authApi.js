import axios from './axios';
import { BASE_API_URL, TEST_API_URL } from '../constant/string'

const signInApi = (email, password) => {
    let data = new FormData();
    //data.append("command", "signIn");
    data.append("email", email);
    data.append("password", password);
    return axios.post("https://api.regionaldelicacyshop.software/api/v1/auth/signin", {
        email,
        password
    });
}

const signUpApi = (email, name, phoneNumber, address, city, country, password) => {
    let data = new FormData();
    //data.append("command", "signUp");
    data.append("email", email);
    data.append("username", name);
    data.append("password", password);
    return axios.post("https://api.regionaldelicacyshop.software/api/v1/auth/signup", {
        name,
        email,
        password,
        phoneNumber,
        address,
        city,
        country
    });
}

const getUserProfileApi = (token) => {

    return axios.get(`${BASE_API_URL}users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const updateUserProfileApi = (token, user) => {

    return axios.put(
        `${BASE_API_URL}users/profile`,
        {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            country: user.country,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};


// const updateUserVisitAPI = () => {
//     let data = new FormData();
//     data.append("command", "updateVisit");

//     return axios.post(TEST_API_URL + "userAPI.php", data);
// }

// const validateApi = () => {
//     return axios.post(TEST_API_URL + "userAPI.php?command=checkToken");
// }

export { signInApi, signUpApi, getUserProfileApi, updateUserProfileApi }