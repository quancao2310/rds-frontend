import axios from "./axios";
import { BASE_API_URL } from '../constant/string'

const accessToken = localStorage.getItem("accessToken");

const getCartApi = (token) => {
    let command = "getCartList";

    return axios.get(`${BASE_API_URL}carts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

const getCartQuantityApi = () => {
    let command = "getTotalQuantity";
    return axios.get(`${BASE_API_URL}carts`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
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

const removeProductFromCartApi = (productId) => {

    let data = new FormData();
    data.append("command","remove");
    data.append("productId",productId);
    return axios.post(BASE_API_URL + `cartAPI.php`, data);
}

const changeQuantityApi = (productId,quantity) => {
    let data = new FormData();

    data.append("command","changeQuantity");
    data.append("productId", productId);
    data.append("quantity", quantity);

    return axios.post(`${BASE_API_URL}carts`,
        {
            productId,
            quantity
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
