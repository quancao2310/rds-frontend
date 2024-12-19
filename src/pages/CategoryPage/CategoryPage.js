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


    const [totalPage, setTotalPage] = useState(0)
    const [productList, setProductList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState(null)
    const [sortField, setSortField] = useState("")
    const [size, setSize] = useState(8);

    // const orderBy = sortBy.split(' ')[0]
    // const option = sortBy.split(' ')[1]
    const itemsPerPage = 8
    const offset = (page - 1) * itemsPerPage

    const getProducts = async () => {
        setIsLoading(true)
        await getTotalCategoryAPI(name, size, page, sortBy?.sort_by, sortBy?.sort_order).then(response => {
            if (response.data.content) {
                const data = response.data.content
                console.log(data)
                setProductList(data)

                const total = response.data.totalPages
                console.log("totalPage:", total)
                setTotalPage(total)
            }
        })
        setIsLoading(false)
    }

    useEffect(() => {
        getProducts()
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

    const handleSort = (e) => {
        setSortField(e.target.value)
        if (e.target.value === "price asc"){
            setSortBy({sort_by: 'price', sort_order: 'asc'})
        } else if (e.target.value === "price desc"){
            setSortBy({sort_by: 'price', sort_order: 'desc'})
        } else if (e.target.value === "name asc"){
            setSortBy({sort_by: 'name', sort_order: 'asc'})
        } else if (e.target.value === "name desc"){
            setSortBy({sort_by: 'name', sort_order: 'desc'})
        } else {
            setSortBy(null)
        }
    }

    return (
        <Box sx={styles.box}>
            <Container maxWidth="lg">
                <Box sx={styles.titleWrapper}>
                    <Typography sx={styles.categoryTitle}>{name}</Typography>
                    <Box sx={styles.sortByWrapper}>
                        <Typography sx={styles.sortBy}>Sắp xếp theo</Typography>
                        <FormControl sx={styles.formControl} className={classes.root}>
                            <Select
                                displayEmpty
                                value={sortField}
                                onChange={handleSort}
                                sx={styles.select}
                            >
                                <MenuItem value="">Không</MenuItem>
                                <MenuItem value="price asc">Giá tăng dần</MenuItem>
                                <MenuItem value="price desc">Giá giảm dần</MenuItem>
                                <MenuItem value="name asc">Tên tăng dần</MenuItem>
                                <MenuItem value="name desc">Tên giảm dần</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
                {isLoading ? (
                    <Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
                        {Array(itemsPerPage).fill().map(() => (
                            <Grid item xs={6} md={4} lg={3}>
                                <ProductSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Grid container spacing={{ xs: 1, md: 3, lg: 3.5 }}>
                        {productList.map((product) => (
                            <Grid item xs={6} md={4} lg={3} key={product.id}>
                                <ProductItem
                                    product={product}
                                    key={product.id}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
                {
                    (productList.length === 0 && !isLoading)
                    &&
                    <div sx={styles.noData} className='w-full text-center'>Không có sản phẩm</div>
                }

                <Box className='mt-[50px] w-full flex justify-between'>
                    {isLoading ? (
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
                    {isLoading ? (
                        <Skeleton variant="text" animation="wave" sx={styles.skeleton}>
                            <Typography gutterBottom variant="h5" component="div">lorem lorem lore</Typography>
                        </Skeleton>
                    ) : (
                        <Pagination
                            classes={{ ul: classes.ul }}
                            count={totalPage}
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
