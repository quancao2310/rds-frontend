import React, { useEffect, useState } from 'react'
import styles from './Cart.styles'

//component
import { TransitionGroup } from 'react-transition-group';
import HorizontalProduct from '../../components/HorizontalProduct/HorizontalProduct';
import EmptyList from '../../components/EmptyList/EmptyList';
import huhu from "../../img/empty-cart.png"
import { Container, Box, Typography, Button, Collapse, Skeleton } from '@mui/material'
import CustomModal from "../../components/Modal/Modal"

//redux && api
import { cartSelector, cartIsLoadingSelector } from "../../store/selectors"
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductFromCart, changeProductQuantity, removeAllCart } from "../../store/actions/cartAction"
import HorizontalProductSkeleton from '../../components/HorizontalProductSkeleton/HorizontalProductSkeleton';
import { getCartApi } from '../../api/cartApi';
import { getProductsAPI } from '../../api/productApi';

const Cart = () => {

    const history = useHistory();
    // const { cartList, totalPrice } = useSelector(cartSelector);
    // const isLoading = useSelector(cartIsLoadingSelector);
    const [isLoading, setIsLoading] = useState(false);

    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const formatedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

    const dispatch = useDispatch();

    const changeQuantity = (product, quantity) => {
        dispatch(changeProductQuantity(product, quantity));
    }
    const removeAllProduct = () => {
        dispatch(removeAllCart());
    }

    const deleteProduct = (product) => {
        dispatch(removeProductFromCart(product));
    }
    const onCheckOut = () => {
        history.push('/checkout/payment')
    }

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            setIsLoading(true);
            getCartApi(token).then(response => {
                if (response.status === 200) {
                    console.log(1, response.data);
                    setCartList(response.data);
                    setTotalPrice(response.data.reduce((total, cart) => {return total + cart.intoMoney}, 0));
                }
                else {
                    console.log(response);
                }
            })
            setIsLoading(false);
        }
    }, []);

    return (
        <Box sx={styles.box}>
            <Box sx={styles.main}>
                <CustomModal
                    openModal={openModalDelete}
                    setOpenModal={setOpenModalDelete}

                    title={"Confirmation"}
                    description="Do you want to remove all products from your cart?"
                    onPressConfirm={removeAllProduct}
                />
                {isLoading ? (
                    <>
                        <Box sx={styles.cartListWrapper}>
                            <Box>
                                <Box sx={styles.removeRow}>
                                    <Typography sx={styles.myCart}>
                                        Giỏ hàng của tôi
                                    </Typography>
                                    <Skeleton variant="text" animation="wave" sx={styles.skeletonRemoveAll}>
                                        <Button sx={styles.removeAll}>
                                            Xóa tất cả
                                        </Button>
                                    </Skeleton>
                                </Box>
                                <HorizontalProductSkeleton />
                                <HorizontalProductSkeleton />
                            </Box>
                        </Box>
                        <Box sx={styles.summary}>
                            <Skeleton variant="rectangular" animation="wave" sx={styles.skeletonSummary} />
                            <Skeleton variant="text" animation="wave" sx={styles.skeletonCheckoutBtn}>
                                <Button sx={styles.checkoutButton}>
                                    Thanh toán
                                </Button>
                            </Skeleton>
                        </Box>
                    </>
                ) : (
                    ""
                )}
                {
                    (!isLoading && cartList.length === 0)
                        ? <EmptyList
                            img={huhu}
                            imgHeight={'60vh'}
                            btnMarginTop={"-10vh"}
                            isCart
                        />
                        : null
                }
                {cartList && cartList.length !== 0 ?
                    <Box sx={styles.cartListWrapper}>
                        <Box>
                            <Box sx={styles.removeRow}>
                                <Typography
                                    sx={styles.myCart}
                                >
                                    Giỏ hàng của tôi
                                </Typography>

                                <Button
                                    onClick={() => {
                                        setOpenModalDelete(true)
                                    }}
                                    color="error"
                                    sx={styles.removeAll}
                                >
                                    Xóa tất cả
                                </Button>
                            </Box>
                            <TransitionGroup>
                                {cartList.map(cart =>
                                    <Collapse key={cart.cartId}>
                                        <HorizontalProduct
                                            key={cart.cartId}
                                            cartProduct
                                            product={cart}
                                            canDelete
                                            onPressDelete={(e) => {
                                                e.preventDefault()
                                                deleteProduct(cart)
                                            }}
                                            changeQuantity={changeQuantity}
                                            imageSize={100}
                                        />
                                    </Collapse>
                                )}
                            </TransitionGroup>
                        </Box>


                    </Box>
                    : null
                }
                {
                    cartList && cartList.length !== 0 ?
                        <Box sx={styles.summary}>
                            <Box sx={styles.summaryData}>
                                <Typography sx={styles.orderSummary}>
                                    Tổng đơn hàng
                                </Typography>

                                <Box sx={styles.taxContainer}>
                                    <Typography sx={styles.summaryTitle}>Thuế</Typography>
                                    <Typography sx={styles.tax}>0đ</Typography>
                                </Box>

                                <Box sx={styles.totalContainer}>
                                    <Typography sx={styles.summaryTitle}>Tổng</Typography>
                                    <Typography sx={styles.total}>
                                        {formatedPrice}</Typography>
                                </Box>
                            </Box>

                            <Button
                                sx={styles.checkoutButton}
                                variant="contained"
                                color="error"
                                onClick={onCheckOut}
                            >
                                Thanh toán
                            </Button>
                        </Box>
                        : null
                }

            </Box>
        </Box>
    )
}

export default Cart

