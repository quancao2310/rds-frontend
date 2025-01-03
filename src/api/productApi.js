import axios from "./axios";
import { BASE_API_URL } from "../constant/string";

// const getProductCategoryAPI = (category, orderBy = 'rating', option = 'DESC', offset = 0, limit = 8) => {
// 	let command = 'getProductCategory';
// 	return axios.get(
// 		TEST_API_URL +
// 			`productAPI.php?command=${command}&typeOfProduct=${category}&orderBy=${orderBy}&option=${option}&offset=${offset}&limit=${limit}`
// 	);

// };
const getProductsAPI = () => {
	return axios.get(
		`${BASE_API_URL}products`
	);

};

const getTotalCategoryAPI = (category, size, page, sortBy, sortOrder) => {
	// let command = 'getTotalCategory';
	return (!sortBy && !sortOrder) ? axios.get(
		`${BASE_API_URL}products`, {
			params: {
				category: category,
				size: size,
				page: page
			}
		}
	) :
	axios.get(
		`${BASE_API_URL}products`, {
			params: {
				category: category,
				size: size,
				page: page,
				sort_by: sortBy,
				sort_order: sortOrder
			}
		}
	);

};

// const getTopRatingAPI = (limit = 10) => {
// 	let command = "getTopRating";
// 	return axios.get(
// 		TEST_API_URL + `productAPI.php?command=${command}&limit=${limit}`
// 	);
// };

const getProductAPI = (productID) => {
	// let command = "getProduct";
	const accessToken = localStorage.getItem('accessToken');
	if (accessToken) {
		return axios.get(
			`${BASE_API_URL}products/${productID}`,{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true
			}
		);
	} else {
		return axios.get(
			`${BASE_API_URL}products/${productID}`
		);
	}
	
};

const searchProductsAPI = (searchValue) => {
	// let command = "searchProducts";
	return axios.get(
		`${BASE_API_URL}products`, {
			params: {
				search: searchValue
			}
		}
	);
};
// const createProduct = (product) => {
// 	let data = new FormData();
// 	data.append("command", "create");
// 	data.append("type", product.type);
// 	data.append("description", product.description);
// 	data.append("spec", product.spec);
// 	data.append("name", product.name);
// 	data.append("price", product.price);
// 	data.append("rating", product.rating);
// 	data.append("sold", product.sold);
// 	data.append("img1", product.img1);
// 	data.append("img2", product.img2);
// 	data.append("img3", product.img3);
// 	data.append("img4", product.img4);

// 	return axios.post(TEST_API_URL + `productAPI.php`, data);
// };
// const editProduct = (product,productID) => {
// 	let data = new FormData();
// 	data.append("command", "modify");
// 	data.append("productID", productID);
// 	data.append("type", product.type);
// 	data.append("description", product.description);
// 	data.append("spec", product.spec);
// 	data.append("name", product.name);
// 	data.append("price", product.price);
// 	data.append("rating", product.rating);
// 	data.append("sold", product.sold);
// 	data.append("img1", product.img1);
// 	data.append("img2", product.img2);
// 	data.append("img3", product.img3);
// 	data.append("img4", product.img4);

// 	return axios.post(TEST_API_URL + `productAPI.php`, data);
// };
// const deleteProduct = (productID) => {
// 	let data = new FormData();
// 	data.append("command", "remove");
// 	data.append("productID", productID);
	
// 	return axios.post(TEST_API_URL + `productAPI.php`, data);
// };
// const updateProductView = (productID) => {
// 	const data = new FormData();
// 	data.append("command", "updateProductView");
// 	data.append("productID", productID);
	
// 	return axios.post(TEST_API_URL + `productAPI.php`, data);
// }
export {
	getProductsAPI,
	getTotalCategoryAPI,
	getProductAPI,
	searchProductsAPI,
};
