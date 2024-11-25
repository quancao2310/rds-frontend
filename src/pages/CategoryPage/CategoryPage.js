import React, { useEffect, useState } from 'react'
import { styles, useStyles } from './CategoryPage.styles'
import { Box, Pagination, Container, Grid, Typography, Select, FormControl, MenuItem, Skeleton } from '@mui/material'
import { useParams,useHistory } from "react-router-dom"
import { getTotalCategoryAPI, getProductCategoryAPI } from '../../api/productApi'
import ProductSkeleton from '../../components/ProductSkeleton/ProductSkeleton'
import ProductItem from '../../components/ProductItem/ProductItem'

const CategoryPage = () => {
    const { name } = useParams()
    const classes = useStyles()
    const history = useHistory();


    const [totalPage, setTotalPage] = useState({ "isLoading": true })
    const [productList, setProductList] = useState({ "isLoading": true, "data": [] })
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState('price ASC')
    const [size, setSize] = useState(8);

    const orderBy = sortBy.split(' ')[0]
    const option = sortBy.split(' ')[1]
    const itemsPerPage = 8
    const offset = (page - 1) * itemsPerPage

    useEffect(() => {
        getTotalCategoryAPI(name, size, page).then(response => {
            if (response.data.content) {
                const data = response.data.content
                console.log(data)
                setProductList({ "isLoading": false, "data": data })

                const total = response.data.totalPages
                console.log("totalPage:", total)
                setTotalPage({ "isLoading": false, "value": total })
            }
        })
    }, [page, sortBy, name, size])

    /*useEffect(() => {
        setProductList({ "isLoading": true }) // when clicking on another pagination, the isLoading is set to true
        getProductCategoryAPI(name, orderBy, option, offset, itemsPerPage).then(response => {
            if (response.data.success) {
                const data = response.data.data
                console.log("productList: ", data)
                setProductList({ "isLoading": false, "data": data })
            }
        })
        window.scrollTo(0, 0) // when clicking on another pagination, scroll to top
    }, [page, sortBy, name])*/

    return (
        <Box sx={styles.box}>
            <Container maxWidth="lg">
                <Box sx={styles.titleWrapper}>
                    <Typography sx={styles.categoryTitle}>{name}</Typography>
                    <Box sx={styles.sortByWrapper}>
                        <Typography sx={styles.sortBy}>Sort by</Typography>
                        <FormControl sx={styles.formControl} className={classes.root}>
                            <Select
                                displayEmpty
                                value={sortBy}
                                onChange={(event) => { setSortBy(event.target.value) }}
                                sx={styles.select}
                            >
                                <MenuItem value={'price ASC'}>Price: lowest</MenuItem>
                                <MenuItem value={'price DESC'}>Price: highest</MenuItem>
                                <MenuItem value={'rating ASC'}>Rating: lowest</MenuItem>
                                <MenuItem value={'rating DESC'}>Rating: highest</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {productList.isLoading ? (
                    <Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
                        {Array(itemsPerPage).fill().map(() => (
                            <Grid item xs={6} md={4} lg={3}>
                                <ProductSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
                        {productList.data.map((product) => (
                            <Grid item xs={6} md={4} lg={3} key={product.productId}>
                                <ProductItem
                                    product={product}
                                    key={product.productId}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {
                    (productList.data.length === 0 && !productList.isLoading)
                    &&
                    <div sx={styles.noData} className='w-full text-center'>Không có sản phẩm</div>
                }

                <Box className='mt-[50px] w-full flex justify-between'>
                    {totalPage.isLoading ? (
                        <Skeleton variant="text" animation="wave" sx={styles.skeleton}>
                            <Typography gutterBottom variant="h5" component="div">lorem lorem lore</Typography>
                        </Skeleton>
                    ) : (
                        <div className='flex items-center'>
                            <Typography sx={styles.sortBy}>Kích thước</Typography>
                            <FormControl className={classes.root}>
                                <Select
                                    displayEmpty
                                    value={size}
                                    onChange={(event) => { setSize(event.target.value) }}
                                    sx={styles.select}
                                >
                                    <MenuItem value={8}>8</MenuItem>
                                    <MenuItem value={16}>16</MenuItem>
                                    <MenuItem value={24}>24</MenuItem>
                                    <MenuItem value={32}>32</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    )}
                    {totalPage.isLoading ? (
                        <Skeleton variant="text" animation="wave" sx={styles.skeleton}>
                            <Typography gutterBottom variant="h5" component="div">lorem lorem lore</Typography>
                        </Skeleton>
                    ) : (
                        <Pagination
                            classes={{ ul: classes.ul }}
                            count={totalPage.value}
                            page={page}
                            onChange={(event, value) => { setPage(value) }}
                        />
                    )}
                </Box>
            </Container>
        </Box>
    )
}

export default CategoryPage
