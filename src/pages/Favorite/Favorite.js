import React, { useEffect, useState } from 'react'
import HorizontalProduct from '../../components/HorizontalProduct/HorizontalProduct'
import HorizontalProductSkeleton from '../../components/HorizontalProductSkeleton/HorizontalProductSkeleton'
import styles from './Favorite.styles'
import { Container, Typography, Collapse } from '@mui/material'
import { getFavoriteListApi, changeFavoriteApi } from '../../api/favoriteApi'
import { Box } from '@mui/system'
import { TransitionGroup } from 'react-transition-group'
import EmptyList from "../../components/EmptyList/EmptyList"
import emptyFav from "../../img/empty-favorite.png"

const Favorite = () => {
    const [favoriteList, setFavoriteList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const token = localStorage.getItem('accessToken')

    const getFavorites = async () => {
        setIsLoading(true);
        await getFavoriteListApi().then(response => {
            if (response.data.success === true) {
                setFavoriteList(response.data)
            }
        });
        setIsLoading(false);
    }
    useEffect(() => {
        if (token){
            getFavorites();
        }
    }, [])

    const onDelete = (productID) => {
        changeFavoriteApi(productID).then(response => {
            console.log(response)
            if (response.data.success === true) {
                if (response.data.data.isLike === false) {
                    let newList = favoriteList.data.filter((product) => product.productID !== productID)
                    console.log("newFavoriteList: ", newList)
                    setFavoriteList({ ...favoriteList, "data": newList })
                }
            }
        })
    }

    return (
        <Box sx={styles.box}>
            <Container maxWidth="md">
                <Typography sx={styles.sliderTitle}>Danh mục yêu thích</Typography>
                {isLoading ? (
                    <>
                        <HorizontalProductSkeleton />
                        <HorizontalProductSkeleton />
                    </>
                ) : (
                    <>
                        {favoriteList && favoriteList.length === 0 ? (
                            <EmptyList img={emptyFav} title={"Danh mục rỗng"} imgHeight={'45vh'} btnMarginTop={"5vh"} />
                        ) : (
                            <>
                                <TransitionGroup>
                                    {favoriteList.map(product =>
                                        <Collapse key={product.productID}>
                                            <HorizontalProduct
                                                product={product}
                                                key={product.productID}
                                                canDelete={true}
                                                ratingSize={"20px"}
                                                onPressDelete={(e) => {
                                                    e.preventDefault()
                                                    onDelete(product.productID)
                                                }}
                                            />
                                        </Collapse>
                                    )}
                                </TransitionGroup>
                            </>
                        )}
                    </>
                )}
            </Container>
        </Box>
    )
}

export default Favorite
