import { React, useState, useEffect } from 'react'
import styles from './OrderDetail.style'
import { useParams } from 'react-router-dom'
import { Container, Box, Typography, Grid, Divider, Skeleton, Collapse, Fab } from '@mui/material'
import HorizontalProduct from '../../components/HorizontalProduct/HorizontalProduct'
import HorizontalProductSkeleton from '../../components/HorizontalProductSkeleton/HorizontalProductSkeleton'
import ProductRatingBar from '../../components/ProductRatingBar/ProductRatingBar'
import { getOrderDetailAPI } from '../../api/orderApi'
import { TransitionGroup } from 'react-transition-group'
import icons from "../../constant/icons";

const statusList = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đã giao']

const Stepper = ({ isChecked, title }) => (
	<Box sx={styles.stepWrapper}>
		<Fab sx={styles.checked}>
			{isChecked && <icons.Check sx={styles.checkIcon} />}
		</Fab>
		<Typography sx={styles.stepTitle} className='text-center'>{title}</Typography>
	</Box>
)

const LineStepper = () => (
	<Box sx={styles.lineWrapper}>
		<Divider sx={styles.stepLine} />
	</Box>
)

const OrderDetail = () => {
	const { id } = useParams()
	const [orderDetail, setOrderDetail] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [activeStatusList, setActiveStatusList] = useState([true, false, false, false])

	const getOrder = async () => {
		setIsLoading(true)
		await getOrderDetailAPI(id).then((response) => {
			if (response.status === 200) {
				const resData = response.data
				setOrderDetail(resData)

				// if (orderStatus != 'Cancelled') {
				// 	const statusIndex = statusList.indexOf(orderStatus)
				// 	let tempList = []

				// 	for (let i = 0; i < statusList.length; i++) {
				// 		if (i <= statusIndex)
				// 			tempList[i] = true;
				// 		else
				// 			tempList[i] = false;
				// 	}

				// 	setActiveStatusList(tempList);
				// }
			}
		})
		setIsLoading(false)
	}

	useEffect(() => {
		getOrder()
	}, [])

	const formatDateDiff = (value) => {
		let type = 'minutes'
		if (value >= 1440) {
			value /= 1440
			type = 'days'
		} else if (value >= 60) {
			value /= 60
			type = 'hours'
		}
		return `${Math.round(value)} ${type} ago`
	}

	const formatPrice = (value) => {
		return new Intl.NumberFormat('vi-VN', {
			style: 'currency',
			currency: 'VND',
		}).format(value)
	}

	return (
		<Box sx={styles.box}>
			<Container maxWidth="lg">
				{isLoading ? (
					<Grid container spacing={6}>
						<Grid item xs={12} lg={5}>
							<Box sx={styles.wrapperSkeleton}>
								<Skeleton variant="rectangular" animation="wave" sx={styles.orderInfoSkeleton} />
							</Box>
						</Grid>
						<Grid item xs={12} lg={7} sx={styles.packageWrapper}>
							<Box sx={styles.productList}>
								<TransitionGroup>
									<Collapse>
										<HorizontalProductSkeleton />
										<Box
											sx={{
												display: 'flex',
												mb: '20px',
											}}
										>
											<Skeleton animation="wave" sx={styles.ratingSkeleton} />
										</Box>
									</Collapse>
								</TransitionGroup>
							</Box>
						</Grid>
					</Grid>
				) : (
					<Grid container spacing={6}>
						<Grid item xs={12} lg={5}>
							<Box sx={styles.wrapper}>
								<Box sx={{ width: '100%' }}>
									<Typography sx={styles.title}>
										Đơn hàng : #{id}{' '}
									</Typography>
									{/* <Typography sx={styles.content}>
										{formatDateDiff(
											orderDetail.orderInfo.dateDiff,
										)}
									</Typography> */}

									<Typography sx={{ ...styles.title, mt: 4 }}>
										Thông tin khách hàng
									</Typography>
									<Typography sx={styles.content}>
										Họ tên: {orderDetail?.customerName}
									</Typography>
									<Typography sx={styles.content}>
										Số điện thoại: {orderDetail?.phoneNumber}
									</Typography>
									<Typography sx={styles.content}>
										Email: {orderDetail?.email}
									</Typography>
									<Typography sx={styles.content}>
										Địa chỉ: {orderDetail?.address}
									</Typography>

									<Typography sx={{ ...styles.title, mt: 4, mb: 2 }}>
										Trạng thái
									</Typography>

									<Box sx={styles.stepper}>
										{activeStatusList.map((isChecked, index) => {
											if (index < 3)
												return (
													<>
														<Stepper isChecked={isChecked} title={statusList[index]} />
														<LineStepper />
													</>
												)
											else
												return (
													<Stepper isChecked={isChecked} title={statusList[index]} />
												)
										})}

										{activeStatusList.length == 0 ?
											(<Typography sx={{ color: 'red', fontWeight: 600 }}>ĐƠN HÀNG ĐÃ BỊ HỦY</Typography>)
											: ("")}
									</Box>

									<Divider sx={styles.divider} />
									<Box sx={{ mt: 4 }}>
										<Box sx={styles.lowerPriceWrapper}>
											<Typography sx={styles.lowerTitles}>
												Thành tiền:
											</Typography>
											<Typography sx={styles.lowerValues}>
												{formatPrice(
													orderDetail?.totalPrice
												)}
											</Typography>
										</Box>
									</Box>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} lg={7} sx={styles.packageWrapper}>
							<Box sx={styles.productList}>
								<TransitionGroup>
									{
										orderDetail?.items.map(product =>
											<Collapse>
												<HorizontalProduct
													product={product}
													ratingSize={'20px'}
												/>
												<Box
													sx={{
														display: 'flex',
														mb: '20px',
													}}
												>
													{
														activeStatusList[3] &&
														<Box>
															<Typography sx={styles.ratingTitle}>
																Your rating:
															</Typography>
															<ProductRatingBar
																orderID={id}
																productID={product.productID}
																customerRating={
																	product.customerRating
																}
															/>
														</Box>
													}
												</Box>
											</Collapse>
										)}
								</TransitionGroup>
							</Box>
						</Grid>
					</Grid>
				)}
			</Container>
		</Box>
	)
}

export default OrderDetail
