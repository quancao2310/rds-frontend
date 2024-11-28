import React, { useState, useEffect, useRef } from 'react'
import styles from './Product.styles'
import { icons } from '../../constant'
import { getProductAPI, getProductCategoryAPI, getTotalCategoryAPI } from '../../api/productApi'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useParams, useLocation, Link, useHistory } from "react-router-dom"
import { Container, Grid, Button, IconButton, CardMedia, Rating, Typography, Divider, Tab, Skeleton, Modal, MenuList, MenuItem, Popper, Paper, Grow, ClickAwayListener } from '@mui/material'
import { Box } from '@mui/system'
import Slider from "react-slick"
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ProductSkeleton from '../../components/ProductSkeleton/ProductSkeleton'
import FormProduct from "../../components/FormProduct/FormProduct";
import CustomModal from '../../components/Modal/Modal'

import { changeQuantityApi } from '../../api/cartApi'
import { addFavoriteApi, changeFavoriteApi, deleteFavoriteApi } from '../../api/favoriteApi'

import { checkNotNegative, checkEmptyForm } from '../../constant/function'
//redux
import { userInfoSelector } from "../../store/selectors";
import { cartSelector } from "../../store/selectors"
import { addProductToCart, changeProductQuantity, showCartNoti, hideCartNoti } from '../../store/actions/cartAction'
import { showAuthError } from '../../store/actions/authAction'
import { showAddFavNoti, showRemoveFavNoti, hideFavNoti } from '../../store/actions/favoriteAction'
// import { deleteProduct } from "../../api/productApi";
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const getImgList = (product) => {
	let res = [];
	/*for (let i = 0; i < 4; i++) {
		if (product[`img${i + 1}`] != "") res.push(product[`img${i + 1}`]);
	}*/
	res.push(product.imageUrl);
	return res;
};

const CustomNextArrow = ({ onClick }) => (
	<IconButton
		aria-label="next"
		component="span"
		size="large"
		onClick={onClick}
		sx={styles.nextArrow}>
		<icons.Next fontSize="inherit" />
	</IconButton>
);

const CustomPrevArrow = ({ onClick }) => (
	<IconButton
		aria-label="prev"
		component="span"
		size="large"
		onClick={onClick}
		sx={styles.prevArrow}>
		<icons.Prev fontSize="inherit" />
	</IconButton>
);

const settingsIMG = {
	dots: true,
	speed: 600,
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 4000,
	pauseOnHover: true,
	swipeToSlide: true,
	centerPadding: "60px",

	nextArrow: <CustomNextArrow />,
	prevArrow: <CustomPrevArrow />,
};

const settingsRelatedProduct = {
	dots: false,
	speed: 400,
	infinite: true,
	slidesToShow: 5,
	slidesToScroll: 1,
	pauseOnHover: true,
	swipeToSlide: true,
	centerPadding: "60px",

	nextArrow: <CustomNextArrow />,
	prevArrow: <CustomPrevArrow />,

	responsive: [
		{
			breakpoint: 1460,
			settings: {
				slidesToShow: 4,
			},
		},
		{
			breakpoint: 1190,
			settings: {
				slidesToShow: 3,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
			},
		},
		{
			breakpoint: 500,
			settings: {
				slidesToShow: 1,
			},
		},
	],
};
/*const defaultemptyProduct = {
	productId: 0,
	type: "",
	description: "",
	spec: "",
	name: "",
	price: 0,
	rating: 0.0,
	sold: 0,
	img1: "",
	img2: "",
	img3: "",
	img4: "",
};*/

const Product = () => {
	//const { name } = useParams()
	const query = useQuery()
	const history = useHistory()
	const productId = query.get("i")
	const [token, setToken] = useState("")
	const [product, setProduct] = useState({ "isLoading": true })
	const [relatedProductList, setRelatedProductList] = useState({ "isLoading": true, "productList": [] })
	const [formatted, setformatted] = useState({})
	const [isFavorite, setIsFavorite] = useState(false)
	const [tab, setTab] = React.useState('1');

	const [modalOpen, setModalOpen] = useState(false);

	const { userID, userRole, isEmpty: userEmpty } = useSelector(userInfoSelector);
	const cart = useSelector(cartSelector);
	const [quantityDifference, setQuantityDifference] = useState(0);

	const dispatch = useDispatch()
	const accessToken = localStorage.getItem('accessToken');

	// function onDeleteProduct() {
	// 	setModalOpen(false);
	// 	deleteProduct(productId).then((response) => {
	// 		if (response.data.success == true) {
	// 			setTimeout(() => {
	// 				window.location.href = "/"
	// 			}, 2000);
	// 		}
	// 	});
	// }

	// const changeFavorite = () => {
	// 	changeFavoriteApi(productId).then(response => {
	// 		if (response.data.success == true) {
	// 			setIsFavorite(response.data.data.isLike)
	// 		}
	// 	})

	// 	if (isFavorite === true) {
	// 		dispatch(showRemoveFavNoti())
	// 	}
	// 	else {
	// 		dispatch(showAddFavNoti())
	// 	}

	// 	setTimeout(() => {
	// 		dispatch(hideFavNoti())
	// 	}, 3000)
	// }

	const addToFavorite = () => {
		if (!accessToken) {
			dispatch(showAuthError())
			return;
		}
		addFavoriteApi(productId).then((response) => {
			if (response.status === 201) {
				setIsFavorite(true)
				// dispatch(showAddFavNoti())
				// setTimeout(() => {
				// 	dispatch(hideFavNoti())
				// }, 3000)
				toast.success("Thêm vào danh mục yêu thích thành công")
				getProductDetail()
			}
		}).catch(err => {
			if (err.response.status === 401) {
			dispatch(showAuthError())
			}
			else {
				toast.error(err.response.data.message)
			}
		})
	}

	const removeFromFavorite = (favoriteId) => {
		if (!accessToken) {
			dispatch(showAuthError())
			return;
		}
		deleteFavoriteApi(favoriteId).then((response) => {
			if (response.status === 204) {
				setIsFavorite(false)
				// dispatch(showRemoveFavNoti())
				// setTimeout(() => {
				// 	dispatch(hideFavNoti())
				// }, 3000)
				toast.success("Xóa khỏi danh mục yêu thích thành công")
				getProductDetail()
			}
		})
		.catch(err => {
			toast.error(err.response.data.message)
		})
	}

	const addItemToCart = () => {

		//if userinfo is empty
		if (!accessToken) {
			dispatch(showAuthError())
			return;
		}
		let productIndex = cart["cartList"].findIndex(item => item.productId == productId);

		//new product
		// if (productIndex == -1) {
			dispatch(addProductToCart(product, token));
		// }
		// //existing product
		// else {
		// 	setQuantityDifference(quantityDifference + 1);
		// 	dispatch(changeProductQuantity(product, 1));
		// }

		// dispatch(showCartNoti())
		// setTimeout(() => {
		// 	dispatch(hideCartNoti())
		// }, 3000);
	}

	useEffect(() => {
		if (quantityDifference != 0) {
			var timeout = setTimeout(() => {
				let changeQuantity = quantityDifference;
				setQuantityDifference(0);
				changeQuantityApi(productId, changeQuantity).then(response => {
					if (response.data.success) {
						console.log('change quantity: ', changeQuantity);
					}
					else {
						console.log("Something wrong is happend");
						dispatch(showAuthError())
					}
				});

			}, 500);
		}

		return () => {
			clearTimeout(timeout);
		}
	}, [quantityDifference])

	const getProductDetail = () => {
		setProduct({ "isLoading": true }) // when clicking on another product, the isLoading is set to true
		setTab('1'); // when clicking on another product, the showing tab is spec
		getProductAPI(productId).then(response => {
			if (response.status === 200) {
				const data = response.data

				// updateProductView(productId);
				let formattedDesc = "Sản phẩm chưa có thông tin mô tả"
				if (data.description !== "")
					formattedDesc = data.description

				/*let formattedSpec = "Sản phẩm chưa có thông tin kỹ thuật"
				if (data.product.spec !== "")
					formattedSpec = data.product.spec;*/
				setformatted({
					price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.price),
					//spec: formattedSpec,
					desc: formattedDesc,
				})

				setIsFavorite(data.favoriteId ? true : false)
				setProduct({ "isLoading": false, ...data })

				let accessToken = localStorage.getItem("accessToken");
				setToken(accessToken);

				getTotalCategoryAPI(data.category).then(response => {
					if (response.data.content.length !== 0)
						setRelatedProductList({ "isLoading": false, "productList": response.data.content })
				})
			}
		})
		.catch(err => {
			toast.error(err.response.data.message)
		})
	}

	useEffect(() => {
		getProductDetail()
	}, [productId]) // when clicking on another product, productId is changed, this will trigger the useEffect again to call a new product API

	const handleChange = (event, newValue) => {
		setTab(newValue);
	}


	//admin UI

	const anchorRefDropDown = useRef(null)
	const clickRefDropDown = useRef(null)
	const [openDropDown, setOpenDropDown] = useState(false);

	const handleToggleDropDown = () => {
		setOpenDropDown((prevOpen) => !prevOpen);
	};

	const handleCloseDropDown = (event) => {
		if (anchorRefDropDown.current && anchorRefDropDown.current.contains(event.target)) {
			return;
		}
		setOpenDropDown(false);
	};

	clickRefDropDown.current = handleToggleDropDown // assign button onclick of parent component to handleToggle function


	return (
		<Box sx={styles.box}>
			<Container maxWidth="xl" sx={styles.productContainer}>
				<Grid container spacing={3}>
					<Grid item xs={12} lg={6}>
						{product.isLoading ? (
							<Skeleton variant="rectangular" animation="wave" sx={styles.imgSkeleton} />
						) : (
							<Box>
								<CardMedia
									component="img"
									image={product.imageUrl}
									alt="product image"
									sx={styles.image}
								/>
							</Box>
						)}

					</Grid>
					<Grid item xs={12} lg={6} sx={styles.wrapper}>
						<Box sx={styles.boxWrapper}>
							{product.isLoading ? (
								<Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography variant="h5" component="div" sx={styles.pName}>lorem lorem lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography variant="h5" component="div" sx={styles.pName}>lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
								</Box>

							) : (
								<Typography variant="h5" component="div" sx={styles.pName}>{product.name}</Typography>
							)}

							{product.isLoading ? (
								<Box sx={styles.boxCenter}>
									<Skeleton variant="text" animation="wave" sx={{ mt: 1, ...styles.skeletonColor }}>
										<Rating size="small" readOnly value={5} precision={0.5} sx={styles.pRating} />
									</Skeleton>
								</Box>
							) : (
								<Box sx={styles.pRatingWrapper}>
									<Rating size="small" readOnly value={5} precision={0.5} sx={styles.pRating} />
									{/* <Typography variant="h5" sx={styles.pSold}>({product.sold})</Typography> */}
								</Box>
							)}

							{product.isLoading ? (
								<Box sx={styles.boxCenter}>
									<Skeleton variant="text" animation="wave" sx={{ mt: 4, ...styles.skeletonColor }}>
										<Typography variant="h5" component="div" sx={styles.pPrice}>9,000,000,000d</Typography>
									</Skeleton>
								</Box>
							) : (
								<Box sx={styles.priceWrapper}>
									<Box sx={styles.dividerWrapper}>
										<Divider sx={styles.divider} />
									</Box>
									<Typography variant="h5" component="div" sx={styles.pPrice}>{formatted.price}</Typography>
								</Box>
							)}
							
							{product.isLoading ? (
								<Box sx={styles.boxCenter}>
									<Skeleton variant="text" animation="wave" sx={{ mt: 4, ...styles.skeletonColor }}>
										<Typography variant="h5" component="div" sx={styles.pPrice}>9,000,000,000d</Typography>
									</Skeleton>
								</Box>
							) : (
								<Box sx={styles.priceWrapper}>
									<div className='text-lg mb-[10px] text-center'><strong>Thương hiệu:</strong> {product.brand}</div>
									<div className='text-lg mb-[10px] text-center'><strong>Kho:</strong> {product.stock}</div>
								</Box>
							)}

							{product.isLoading ? (
								<Box sx={styles.btnWrapper}>
									<Skeleton variant="text" animation="wave" sx={styles.skeletonButton}>
										<Button variant="outlined" startIcon={isFavorite ? (<icons.IsFavorite />) : (<icons.NotFavorite />)} sx={styles.addBtn}>
											Thêm Vào Giỏ Hàng
										</Button>
									</Skeleton>
									<Skeleton variant="text" animation="wave" sx={styles.skeletonButton}>
										<Button variant="contained" startIcon={<icons.AddCart />} sx={styles.addBtn}>
											Thêm Vào Giỏ Hàng
										</Button>
									</Skeleton>
								</Box>

							) : (
								<Box sx={styles.btnWrapper}>
									{isFavorite ? (
										<Button
											variant="outlined"
											startIcon={<icons.IsFavorite style={{ color: "red" }} />}
											sx={styles.favoriteBtn}
											onClick={() => removeFromFavorite(product.favoriteId)}
										>
											Xóa Khỏi Yêu Thích
										</Button>
									) : (
										<Button
											variant="outlined"
											startIcon={<icons.NotFavorite />}
											sx={styles.favoriteBtn}
											onClick={addToFavorite}
										>
											Thêm Vào Yêu Thích
										</Button>
									)}
									<Button
										onClick={addItemToCart} variant="contained"
										startIcon={<icons.AddCart />}
										sx={styles.addBtn}
									>
										Thêm Vào Giỏ Hàng
									</Button>
								</Box>
							)}

							{/* {userRole == 0 && (
								product.isLoading ? (
									<Box sx={styles.adminWrapper}>
										<Skeleton
											variant="text"
											animation="wave"
											sx={styles.skeletonButton}>
											<Button>
												<icons.More />
											</Button>
										</Skeleton>
									</Box>
								) : (
									<Box sx={styles.adminWrapper}>
										<Button
											ref={anchorRefDropDown}
											sx={styles.adminBtn}
											id="composition-button"
											aria-controls={'composition-menu'}
											aria-expanded={'true'}
											aria-haspopup="true"
											onClick={() => clickRefDropDown.current()}

										>
											<icons.More />
										</Button>
									</Box>
								)
							)} */}

							<Popper
								open={openDropDown}
								anchorEl={anchorRefDropDown.current}
								role={undefined}
								placement="bottom-start"
								transition
								disablePortal
								style={styles.wrapper}
							>
								{({ TransitionProps, placement }) => (
									<Grow
										{...TransitionProps}
										style={{
											transformOrigin:
												placement === 'bottom-start' ? 'left top' : 'left bottom',
										}}
									>
										<Paper sx={styles.menu}>
											<ClickAwayListener onClickAway={handleCloseDropDown}>
												<MenuList
													autoFocusItem={openDropDown}
													id="composition-menu"
													aria-labelledby="composition-button"
												>
													<MenuItem onClick={() => history.push('/profile/editproduct', product.product)} sx={styles.adminMenu}>
														<Box sx={styles.adminBtnWrapper}>
															<icons.Edit sx={styles.adminIcon} />
															<Typography sx={styles.adminText}>Edit</Typography>
														</Box>
													</MenuItem>

													<MenuItem onClick={() => setModalOpen(true)} sx={styles.adminMenu}>
														<Box sx={styles.adminBtnWrapper}>
															<icons.Trashcan sx={styles.adminIcon} />
															<Typography sx={styles.adminText}>Xóa</Typography>
														</Box>
													</MenuItem>
												</MenuList>

											</ClickAwayListener>
										</Paper>
									</Grow>
								)}
							</Popper>
						</Box>
					</Grid>
				</Grid>
			</Container>

			{/* {formOpen && (
				<Container maxWidth="lg" sx={styles.detailContainer}>
					<FormProduct
						form={productForm}
						setProduct={setProductForm}
						setAppear={setFormOpen}
						handleSubmit={submitEditForm}
					/>
				</Container>
			)} */}
			<Container maxWidth="lg" sx={styles.detailContainer}>
				<Box>
					<TabContext value={tab}>
						<Box sx={styles.tabListWrapper} >
							<TabList onChange={handleChange} aria-label="Tabs" TabIndicatorProps={{
								style: { background: "black", height: "3px", top: "45px", color: "red" }
							}} textColor='inherit'>
								{product.isLoading ? (
									<Skeleton variant="text" animation="wave" sx={styles.skeletonTab}>
										<Tab sx={styles.tabTitle} value="1" />
									</Skeleton>
								) : (
									<Tab sx={styles.tabTitle} label="Mô tả sản phẩm" value="1" />
								)}
								{/* {product.isLoading ? (
									<Skeleton variant="text" animation="wave" sx={styles.skeletonTab}>
										<Tab sx={styles.tabTitle} value="2" />
									</Skeleton>
								) : (
									<Tab sx={styles.tabTitle} label="Specification" value="2" />
								)} */}
							</TabList>
						</Box>
						<TabPanel value="1">
							{product.isLoading ? ("") : (
								<Typography sx={styles.details}>{formatted.desc}</Typography>
							)}
						</TabPanel>
						<TabPanel value="2">
							{product.isLoading ? (
								<Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography sx={styles.details}>lorem lorem lorem lorem lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography sx={styles.details}>lorem lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography sx={styles.details}>lorem lorem lorem lorem lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
									<Box sx={styles.boxCenter}>
										<Skeleton variant="text" animation="wave" sx={styles.skeletonColor}>
											<Typography sx={styles.details}>lorem lorem lorem lorem lorem</Typography>
										</Skeleton>
									</Box>
								</Box>

							) : (
								<Typography sx={styles.details}>{formatted.spec}</Typography>
							)}
						</TabPanel>
					</TabContext>
				</Box>
			</Container>

			<Container maxWidth="xl" sx={styles.relatedProductContainer}>

				{relatedProductList.isLoading ? (
					<Box className="px-[50px]">
						<Box sx={styles.boxCenter}>
							<Skeleton variant="text" animation="wave" sx={styles.skeletonTitle}>
								<Typography gutterBottom variant="h5" component="div">lorem lorem lorem</Typography>
							</Skeleton>
						</Box>
						<Slider {...settingsRelatedProduct}>
							{Array(10).fill().map(() => (<ProductSkeleton isSlider />))}
						</Slider>
					</Box>
				) : (
					<Box className="px-[50px]">
						<Box sx={styles.relatedProductWrapper}>
							<Typography gutterBottom variant="h5" component="div" sx={styles.sliderTitle}>Sản phẩm tương tự</Typography>
							<Link style={styles.link} to={`/category/${product.isLoading ? "" : product.category}`}>
								<Button size="small" sx={styles.viewMoreBtn}>Xem thêm</Button>
							</Link>
						</Box>
						<Slider {...settingsRelatedProduct}>
							{relatedProductList.productList.map(product => (
								<ProductItem
									product={product}
									key={product.productId}
									isSlider
								/>
							))}
						</Slider>
					</Box>
				)}
			</Container>

			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Box sx={styles.modal}>
					<h4>Bạn có chắc chắn muốn xóa sản phẩm này</h4>
					<Box sx={{ textAlign: "center" }}>
						<Button
							variant="outlined"
							sx={{ mx: 1 }}
							onClick={() => setModalOpen(false)}>
							Cancel
						</Button>
						{/* <Button
							variant="outlined"
							sx={{ mx: 1 }}
							color="error"
							onClick={() => onDeleteProduct()}>
							Confirm
						</Button> */}
					</Box>
				</Box>
			</Modal>
		</Box>
	)
}

export default Product
