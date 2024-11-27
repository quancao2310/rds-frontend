import axios from "./axios";
import { BASE_API_URL } from "../constant/string";

const getCategoriesAPI = () => {
	return axios.get(
		`${BASE_API_URL}categories`
	);

};

export {
	getCategoriesAPI	
};
