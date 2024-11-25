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
import { changeQuantityApi, getCartApi, removeProductFromCartApi } from '../../api/cartApi';
import { getProductsAPI } from '../../api/productApi';
import { toast } from 'react-toastify';

const Cart = () => {

    const history = useHistory();
    // const { cartList, totalPrice } = useSelector(cartSelector);
    // const isLoading = useSelector(cartIsLoadingSelector);
    const [isLoading, setIsLoading] = useState(true);

    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [cartList, setCartList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const formatedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);

    const dispatch = useDispatch();

    const changeQuantity = (cartId, quantity) => {
        // dispatch(changeProductQuantity(product, quantity));
        changeQuantityApi(cartId, quantity).then(response => {
            if (response.status === 200) {
                getCarts();
            }
            else {
                console.log(response);
            }
        })
    }
    const removeAllProduct = () => {
        dispatch(removeAllCart());
    }

    const deleteProduct = (cartId) => {
        // dispatch(removeProductFromCart(product));
        removeProductFromCartApi(cartId).then(response => {
            if (response.status === 200) {
                toast.success("Xóa giỏ hàng thành công!")
                getCarts();
            }
            else {
                console.log(response);
            }
        })
    }
    const onCheckOut = () => {
        history.push('/checkout/payment')
    }

    const token = localStorage.getItem('accessToken');

    const getCarts = async () => {
        setIsLoading(true); // Start loading
        await getCartApi(token).then(response => {
            if (response.status === 200) {
                localStorage.setItem('cartQuantity', response.data.length);
                setCartList(response.data);
                setTotalPrice(response.data.reduce((total, cart) => {return total + cart.intoMoney}, 0));
            }
            else {
                console.log(response);
            }
        })
        setIsLoading(false);
    };

    useEffect(() => {
        if (token) {
            getCarts();
        }
        else {
            setIsLoading(false);
        }
    }, []);

    return (
        <Box sx={styles.box}>
            <Box sx={styles.main}>
                <CustomModal
                    openModal={openModalDelete}
                    setOpenModal={setOpenModalDelete}

                    title={"Xác nhận"}
                    description="Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng?"
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
                {!isLoading && cartList && cartList.length !== 0 ?
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
                                                deleteProduct(cart.cartId)
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
                    !isLoading && cartList && cartList.length !== 0 ?
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
                                    <Typography sx={styles.summaryTitle}>Tổng số tiền</Typography>
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

