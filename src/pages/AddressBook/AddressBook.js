import { React, useState, useEffect } from "react"
import {
	Box,
	Container,
	Typography,
	Button,
	Dialog, DialogTitle,
	Collapse,
	Skeleton,
} from "@mui/material"
import CardAddress from "../../components/CardAddresss/CardAddress"
import FormAddress from "../../components/FormAddress/FormAddress"
import icons from "../../constant/icons"
import { TransitionGroup } from 'react-transition-group'
import styles from "./AddressBook.styles"
import { getAddressBook, deleteAddressBook } from "../../api/addressApi"
import HorizontalProductSkeleton from "../../components/HorizontalProductSkeleton/HorizontalProductSkeleton"
import EmptyList from "../../components/EmptyList/EmptyList"
import emptyAddress from "../../img/empty-address.png"
import { useSelector } from "react-redux"
import { getUserProfileApi } from "../../api/authApi"

const AddressBook = () => {
	const [modelAppear, setModelAppear] = useState(false)
	const [addressList, setAddressList] = useState({ "isLoading": true })
	const userInfo = useSelector((state) => state.Authentication.user)
	const accessToken = localStorage.getItem('accessToken');
	const [userProfile, setUserProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getUser = async () => {
		setIsLoading(true);
		await getUserProfileApi(accessToken).then(response => {
			setUserProfile(response.data);
			localStorage.setItem('userName', response.data.name);
		})
		setIsLoading(false);
	}

	useEffect(() => {
		// getAddress()
		getUser();
	}, [])

	// const getAddress = () => {
	// 	getAddressBook().then((response) => {
	// 		if (response.data.success == true) {
	// 			setAddressList({ "isLoading": false, "data": response.data.data })
	// 			console.log("addressList: ", response.data.data)
	// 		}
	// 	})
	// }

	const onCreate = (id, name, address, phone) => {
		let obj = {
			deliveryID: id,
			address: address,
			name: name,
			phone: phone,
		}
		let newLs = addressList.data
		newLs.push(obj)
		setAddressList({ ...addressList, data: newLs })
	}

	const onEdit = (id, name, address, phone) => {
		let obj = {
			deliveryID: id,
			address: address,
			name: name,
			phone: phone,
		}

		let indexbyid = addressList.data.findIndex(
			(address) => address.deliveryID == id
		)
		let newLs = JSON.parse(JSON.stringify(addressList.data))

		newLs[indexbyid] = obj

		setAddressList({ ...addressList, data: newLs })
	}

	const onDelete = (id) => {
		deleteAddressBook(id).then((res) => {
			if (res.data.success == true) {
				const newLs = addressList.data.filter((address) => address.deliveryID !== id)
				setAddressList({ ...addressList, data: newLs })
			}
		})
	}

	return (
		<Box sx={styles.box}>
			<Container maxWidth="md">
				<Box sx={styles.titleWrapper}>
					<Typography sx={styles.title}>Hồ sơ cá nhân</Typography>
				</Box>
				
				{
					isLoading
					?
					<HorizontalProductSkeleton />
					:
					<TransitionGroup>
						<Collapse>
							<CardAddress
								address={userProfile}
								onEdit={onEdit}
								onDelete={onDelete}
								onReset={getUser}
							/>
						</Collapse>
					</TransitionGroup>
				}
					

			</Container>
			<Dialog
				open={modelAppear}
				onClose={() => setModelAppear(false)}
				sx={styles.dialog}
			>
				<DialogTitle sx={{ textAlign: "center" }}>New Address</DialogTitle>
				<FormAddress
					formCommand="create"
					formSubmit={onCreate}
					setAppear={setModelAppear}
				/>
			</Dialog>
		</Box>
	)
}

export default AddressBook
