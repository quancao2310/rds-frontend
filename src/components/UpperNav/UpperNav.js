import { React, useState, useEffect, useRef } from 'react'
import { styles, useStyles } from './UpperNav.style'
import { Link } from 'react-router-dom'
import {
	Grid,
	TextField,
	InputAdornment,
	Typography,
	Box,
	Badge,
	Card,
	CardContent,
	Button,
	Backdrop,
	Modal,
} from '@mui/material'
import logo from '../../img/logo.jpg'
import { icons } from '../../constant'
import { useDispatch, useSelector } from 'react-redux'
import { searchProductsAPI } from '../../api/productApi'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

import { cartSelector } from '../../store/selectors'
import SearchProductItem from '../SearchProductItem/SearchProductItem'
import { getCartQuantity } from '../../store/actions/cartAction'

const UpperNav = () => {
	const userInfo = useSelector((state) => state.Authentication.user)
	const cart = useSelector(cartSelector)
	const anchorRef = useRef(null)
	const clickRef = useRef(null)
	const searchBarRef = useRef(null)
	const classes = useStyles();
	const accessToken = localStorage.getItem('accessToken');
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState('')
	const handleChange = (event) => {
		setSearchValue(event.target.value)
	}

	const handleClick = (e) => {
		if (searchValue !== '') {
			setOpenSearch(true)
		}
	}

	const [searchResult, setSearchResult] = useState([])
	const [searchStatus, setSearchStatus] = useState(0) // 0: no search input, 1: has data, 2: no data found
	const [openSearch, setOpenSearch] = useState(false)

	useEffect(() => {
		if (searchValue !== '') {
			const delay = setTimeout(() => {
				searchProductsAPI(searchValue).then((response) => {
					if (response.status === 200) {
						setSearchResult(response.data.content.slice(0,5))
						if (response.data.content.length !== 0) {
							setSearchStatus(1)
							setOpenSearch(true)
							searchBarRef.current.focus()
						} else {
							setSearchStatus(2)
							setOpenSearch(true)
							searchBarRef.current.focus()
						}
					}
				})
			}, 500)
			return () => clearTimeout(delay)
		} else {
			setSearchResult([])
			setSearchStatus(0)
		}
	}, [searchValue])

	console.log(searchStatus)

	const isZIndex = (isOpen) => ({
		zIndex: isOpen ? ("1400") : ("1200"),
	})

	return (
		<Grid container spacing={0} sx={{...styles.container, ...isZIndex(openSearch)}}>
			<Grid item lg={3} xs={12} sx={styles.logoWrapper}>
				<Link to="/">
					<img style={styles.logo} src={logo} alt="logo" />
				</Link>
			</Grid>

			<Grid item lg={6} xs={12} sx={styles.searchComponent}>
				<Box sx={styles.searchBarWrapper}>
					<TextField
						sx={styles.searchBar}
						className={classes.root}
						size="small"
						placeholder="Tìm kiếm sản phẩm"
						value={searchValue}
						onClick={handleClick}
						onChange={handleChange}
						inputRef={searchBarRef}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<icons.Search />
								</InputAdornment>
							),
						}}
					/>
				</Box>

				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={openSearch}
					onClose={() => setOpenSearch(false)}
					disableEnforceFocus
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}
				>
						<Box sx={styles.searchResult}>
							{searchStatus !== 2 ? (
								searchResult.map((product) => (
									<SearchProductItem product={product} />
								))
							) : (
								<Card>
									<CardContent>
										<Typography>Không tìm thấy kết quả nào</Typography>
									</CardContent>
								</Card>
							)}
						</Box>
				</Modal>
			</Grid>

			<Grid item lg={3} xs={12} sx={styles.menuContainer}>
				<Grid container spacing={0}>
					<Grid item xs={6}>
						<Link to="/checkout/cart" style={styles.menuItem}>
							<Badge badgeContent={localStorage.getItem('cartQuantity') || 0} color="error">
								<icons.Cart sx={styles.icon} />
							</Badge>
							<Typography sx={styles.menuTitle}>
								Giỏ hàng
							</Typography>
						</Link>
					</Grid>
					<Grid item xs={6}>
						{!accessToken ? (
							<Link to="/authentication" style={styles.menuItem}>
								<icons.User sx={styles.icon} />
								<Typography sx={styles.menuTitle}>
									Đăng nhập
								</Typography>
							</Link>
						) : (
							<Box sx={{display: 'flex', justifyContent: 'center'}}>
								<Button
									ref={anchorRef}
									id="composition-button"
									aria-controls={'composition-menu'}
									aria-expanded={'true'}
									aria-haspopup="true"
									onClick={() => clickRef.current()}
									sx={styles.btnNav}
								>
									<icons.User sx={styles.icon} />
									<Typography sx={styles.menuTitle}>{localStorage.getItem('userName')}</Typography>
								</Button>
								<ProfileMenu anchorRef={anchorRef} clickRef={clickRef} />
							</Box>
						)}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default UpperNav
