import React from 'react'
import styles from './OrderComponent.style'
import { Link } from 'react-router-dom'
import { Box, Button, Typography, Collapse } from '@mui/material'
import HorizontalProduct from '../../components/HorizontalProduct/HorizontalProduct'
import { TransitionGroup } from 'react-transition-group'

const OrderComponent = ({ orderID, orderItem }) => {
	const orderHistoryURL = `/profile/orderhistory/${orderID}`

	return (
		<Box sx={styles.main}>
			<Box sx={styles.titleDiv}>
				<Typography sx={styles.title}>Đơn hàng: #{orderID}</Typography>
				<Link style={styles.link} to={orderHistoryURL}>
					<Button sx={styles.titleBtn}>Xem chi tiết</Button>
				</Link>
			</Box>
			<Box sx={styles.contentDiv}>
				<Box sx={styles.productList}>
					{/* <TransitionGroup> */}
						{orderItem.items.map(product => {
							// <Collapse key={product.productID}>
                const newProduct = {
                    productId: product.productId,
                    productName: product.name,
                    productImageUrl: product.imageUrl,
                    unitPrice: product.price,
                    quantity: product.quantity,
                    totalPrice: product.intoMoney,
                };
                return <HorizontalProduct product={newProduct} imageSize={100}/>
							// </Collapse>
            })}
					{/* </TransitionGroup> */}
				</Box>
			</Box>
		</Box>
	)
}

export default OrderComponent
