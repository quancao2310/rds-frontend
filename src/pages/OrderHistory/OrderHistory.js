import { React, useState, useEffect } from 'react'
import styles from './OrderHistory.style'
import { Container, Typography, Box, Collapse, Skeleton, Button } from '@mui/material'
import OrderComponent from '../../components/OrderComponent/OrderComponent'
import { getOrderListAPI } from '../../api/orderApi'
import { TransitionGroup } from 'react-transition-group'
import HorizontalProductSkeleton from '../../components/HorizontalProductSkeleton/HorizontalProductSkeleton'
import EmptyList from "../../components/EmptyList/EmptyList"
import emptyOrder from "../../img/empty-order.png"

const OrderHistory = () => {
	const [orderList, setOrderList] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const getOrderList = async () => {
		setIsLoading(true);
		await getOrderListAPI().then((response) => {
			if (response.status === 200) {
				setOrderList(response.data)
			}
		});
		setIsLoading(false);
	}
	useEffect(() => {
		getOrderList();
	}, [])

	return (
		<Box sx={styles.box}>
			<Container>
				<Typography sx={styles.title}>Lịch sử mua hàng</Typography>
				{isLoading ? (
					<Box sx={styles.isLoadingMain}>
						<Box sx={styles.titleDiv}>
							<Skeleton variant="text" animation="wave" sx={styles.skeletonOrderID}>
								<Typography sx={styles.title}>Order: #0000</Typography>
							</Skeleton>
							<Skeleton variant="text" animation="wave" sx={styles.skeletonBtn}>
								<Button sx={styles.titleBtn}>Xem chi tiết</Button>
							</Skeleton>
						</Box>
						<Box sx={styles.contentDiv}>
							<Box sx={styles.productList}>
								<HorizontalProductSkeleton />
							</Box>
						</Box>
					</Box>
				) : (
					<>
						{orderList && orderList.length === 0 ? (
							<EmptyList img={emptyOrder} title={"Bạn chưa đặt đơn hàng nào"} imgHeight={'45vh'} btnMarginTop={"5vh"} />
						) : (
							<Box>
								{orderList.map((order) =>
									<OrderComponent
										key={order.orderId}
										orderID={order.orderId}
										orderItem={order}
									/>
								)}
							</Box>
						)}
					</>
				)}

			</Container>
		</Box>
	)
}

export default OrderHistory
