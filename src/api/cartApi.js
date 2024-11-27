import axios from "./axios";
import { BASE_API_URL } from '../constant/string'

const accessToken = localStorage.getItem("accessToken");

const getCartApi = (token) => {
    let command = "getCartList";

    return axios.get(`${BASE_API_URL}carts`,{
        params: {
            size: 50
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getCartQuantityApi = (token) => {
    // let command = "getTotalQuantity";
    // return axios.get(`${BASE_API_URL}carts`, {
    //     headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //     },
    // });
    return axios.get(`${BASE_API_URL}carts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const addProductToCartApi = (productId, token) => {

    let data = new FormData();
    data.append("command","add");
    data.append("productId",productId);
    let quantity = 1;
    return axios.post(`${BASE_API_URL}carts`,
        {
            productId,
            quantity
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

const removeProductFromCartApi = (cartId) => {

    // let data = new FormData();
    // data.append("command","remove");
    // data.append("productId",productId);
    // return axios.post(BASE_API_URL + `cartAPI.php`, data);
    return axios.delete(`${BASE_API_URL}carts/${cartId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

const changeQuantityApi = (cartId, quantity) => {

    return axios.put(`${BASE_API_URL}carts`,
        {
            cartId: cartId,
            quantity: quantity
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
}


const removeAllApi = () => {
    let data = new FormData();

    data.append("command","removeAll");

    return axios.post(BASE_API_URL + `cartAPI.php`,data);
}

export { 
    getCartApi,
    addProductToCartApi,
    removeProductFromCartApi,
    getCartQuantityApi,
    changeQuantityApi,
    removeAllApi,
};
