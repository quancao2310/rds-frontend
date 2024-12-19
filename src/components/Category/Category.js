import { React, useEffect, useState } from 'react';
import styles from './Category.style';
import { Container, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import ProductItem from '../ProductItem/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import ProductSkeleton from '../ProductSkeleton/ProductSkeleton';
import { getTotalCategoryAPI } from '../../api/productApi'

const Category = ({ categoryName, selector, noOfSkeleton }) => {
	// const { isLoading, productList } = useSelector(selector)
	const [productList, setProductList] = useState({ "isLoading": true })

	useEffect(() => {
        getTotalCategoryAPI(categoryName).then(response => {
            if (response.data.content.length !== 0) {
                const data = response.data.content.slice(0,4)
                setProductList({ "isLoading": false, "data": data })
            }
        })
    }, [])

	return (
		<Container maxWidth="lg" sx={{ marginTop: '60px' }}>
			<Box sx={styles.category}>
				<Typography
					gutterBottom
					variant="h5"
					component="div"
					sx={styles.categoryTitle}
				>
					{categoryName}
				</Typography>
				<Link style={styles.link} to={`/category/${categoryName}`}>
					<Button size="small" sx={styles.viewMoreBtn}>Xem thêm</Button>
				</Link>
			</Box>
			{productList.isLoading ? (
				<Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
					{Array(noOfSkeleton).fill().map(() => (
						<Grid item xs={6} md={4} lg={3}>
							<ProductSkeleton />
						</Grid>
					))}
				</Grid>
			) : (
				<Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
					{productList.data.map((product) => (
						<Grid item xs={6} md={4} lg={3} key={product.id}>
							<ProductItem
								product={product}
								key={product.id}
							/>
						</Grid>
					))}
				</Grid>
			)}
		</Container>
	);
};

export default Category;
