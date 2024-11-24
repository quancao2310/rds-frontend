import ActionType from "./actionType";
import {
    getCartApi,
    getCartQuantityApi,
    addProductToCartApi,
    removeProductFromCartApi,
    // changeQuantityApi,
    removeAllApi,
} from "../../api/cartApi"

import {showAuthError} from "../actions/authAction"

const getCart = (token) => {

    return dispatch => {
        dispatch({ type: ActionType.START_GET_CART_LIST });

        getCartApi(token).then(response => {
            if (response.status === 200) {
                const data = response.data;
                console.log("getCart:", data);
                dispatch({ type: ActionType.GET_CART_LIST_SUCCESS, data: data });
            }
            else {
                dispatch({ type: ActionType.GET_CART_LIST_FAIL })
            }
        })
    }
}

const getCartQuantity = () => {
    return dispatch => {
        getCartQuantityApi().then(response => {
            if (response.status === 200) {
                const data = response.data;
                dispatch({
                    type: ActionType.GET_CART_QUANTITY,
                    quantity: data.length
                });
            }
        })
    }
}

const addProductToCart = (product, token) => {

    const productId = product.productId;

    const productData = {
        productId: productId,
        rating: 5,
        name: product.name,
        img1: product.imageUrl,
        quantity: 1,
        price: product.price,
    }

    return async dispatch => {
        dispatch({
            type: ActionType.ADD_PRODUCT_TO_CART,
            data: productData,
        })
        const response = await addProductToCartApi(productId, token);

        if (response.status !== 200) {
            console.log('error ?');
            dispatch(showAuthError());
        }
    }
}

const removeProductFromCart = (product) => {

    const productId = product.productId;
    return async (dispatch) => {
        dispatch({
            type: ActionType.REMOVE_PRODUCT_FROM_CART,
            productId: productId,
            price: product.price,
            quantity: product.quantity,
        });
        const response = await removeProductFromCartApi(productId);

        if (!response.data.success) {
            dispatch(showAuthError());
        }
    }
}

const changeProductQuantity = (product, quantity) => {

    const productId = product.productId;
    return (dispatch) => {
        dispatch({
            type: ActionType.CHANGE_QUANTITY_PRODUCT,
            productId: productId,
            productPrice: product.price,
            quantity: quantity,
        })
    }
}

const removeAllCart = () => {
    return async (dispatch) => {
        dispatch({
            type: ActionType.REMOVE_ALL_CART,
        })

        const response = await removeAllApi();

        if (!response.data.success) {
            dispatch(showAuthError());
        }
    }
}

const showCartNoti = () => {
    return dispatch => {
        dispatch({
            type: ActionType.SHOW_CART_NOTI,
        });
    }
}

const hideCartNoti = () => {
    return dispatch => {
        dispatch({
            type: ActionType.HIDE_CART_NOTI,
        });
    }
}

const clearCartUI = () => {
    return dispatch => {
        dispatch({
            type: ActionType.CLEAR_CART_UI,
        });
    }
}

export {
    getCart,
    getCartQuantity,
    addProductToCart,
    removeProductFromCart,
    changeProductQuantity,
    removeAllCart,
    showCartNoti,
    hideCartNoti,
    clearCartUI,
};
