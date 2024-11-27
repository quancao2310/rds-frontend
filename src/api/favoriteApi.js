import axios from './axios';
import { BASE_API_URL } from '../constant/string'

const accessToken = localStorage.getItem('accessToken');
const getFavoriteListApi = () => {
    return axios.get(BASE_API_URL + `products/favorites`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
    });
}

const addFavoriteApi = (productId) => {
    return axios.post(BASE_API_URL + `products/favorites`, {
        productId: productId
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
    });
};

const deleteFavoriteApi = (favoriteId) => {
    return axios.delete(BASE_API_URL + `products/favorites/${favoriteId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true
    });
};

// const changeFavoriteApi = (productID) => {
//     let data = new FormData();
//     let command = "changeFavorite";
//     data.append("productID", productID);
//     data.append("command", command);
//     return axios.post(BASE_API_URL + "favorAPI.php", data);
// }

export { getFavoriteListApi, deleteFavoriteApi, addFavoriteApi };