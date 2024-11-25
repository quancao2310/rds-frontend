import axios from './axios';
import { BASE_API_URL } from '../constant/string';

const accessToken = localStorage.getItem('accessToken');

const getOrderListAPI = () => {
	// let command = 'getOrderList';
	return axios.get(BASE_API_URL + `orders`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};

const getOrderDetailAPI = (orderID) => {
	// let command = 'getOrderDetail';
	return axios.get(
		BASE_API_URL + `orders/${orderID}`,{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
};

const rateProduct = (orderID, productID, rating) => {
	let data = new FormData();
	data.append('command', 'rateProduct');
	data.append('orderID', orderID);
	data.append('productID', productID);
	data.append('rating', rating);
	return axios.post(BASE_API_URL + `orderAPI.php`, data);
};

const createOrder = (customerName, address, phoneNumber, email, cartIds, discountCode) => {
	return axios.post(BASE_API_URL + `orders`, {
		customerName: customerName,
		address: address,
		phoneNumber: phoneNumber,
		email: email,
		cartIds: cartIds,
		paymentMethod: "CASH_ON_DELIVERY",
		...(discountCode ? { discountCode: discountCode } : {}),
	}, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});
};
export { getOrderListAPI, getOrderDetailAPI, rateProduct, createOrder };
