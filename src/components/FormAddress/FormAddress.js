import { React, useState, useEffect } from "react";
import {
	Input,
	InputLabel,
	Button,
	FormControl,
	FormHelperText,
	Box,
	TextField,
	Container,
} from "@mui/material";
import styles from './FormAddress.styles'
import {checkEmptyForm} from "../../constant/function";
import { createAddressBook, editAddressBook } from "../../api/addressApi";
import { updateUserProfileApi } from "../../api/authApi";
import { toast } from "react-toastify";

const FormAddress = ({
	address,
	formCommand,
	formSubmit,
	setAppear,
	onReset,
	paymentChooseNewAddress = false,
}) => {
	const [form, setForm] = useState({
		email: address?.email,
		name: address?.name,
		phoneNumber: address?.phoneNumber,
		address: address?.address,
		city: address?.city,
		country: address?.country,
	});
	const accessToken = localStorage.getItem('accessToken');

	// useEffect(() => {
	// 	arrAddress = address.address.split(", ");
	// 	while (arrAddress.length < 4) {
	// 		//for error process
	// 		arrAddress.push("");
	// 	}
	// 	//if (arrAddress.length == 1) arrAddress = ["","","",""] //for change textfield
	// 	setForm({
	// 		name: address.name,
	// 		addressInForm: arrAddress[0],
	// 		ward: arrAddress[1],
	// 		district: arrAddress[2],
	// 		city: arrAddress[3],
	// 		phone: address.phone,
	// 	});
	// }, [address]);
	// const [addressForm,setAddress] = useState(arrAddress[0])
	// const [ward,setWard] = useState(arrAddress[1])
	// const [district,setDistrict] = useState(arrAddress[2])
	// const [city,setCity] = useState(arrAddress[3])
	// const [phone,setPhone] = useState(address.phone)

	function handleSubmit(e) {
		e.preventDefault();
		updateUserProfileApi(accessToken, form)
			.then(() => {
				toast.success("Chỉnh sửa hồ sơ thành công!");
				onReset();
				setAppear(false)
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	}

	return (
		<Box sx={styles.box}>
			<FormControl fullWidth="true">
				<TextField
					sx={styles.textField}
					name="name"
					label="Họ tên"
					onChange={(e) =>
						setForm({ ...form, name: e.target.value })
					}
					placeholder="Họ tên"
					value={form.name}
					variant="outlined"
					inputProps={{style: {fontSize: "17px"}}}
				/>
				<TextField
					sx={styles.textField}
					name="phoneNumber"
					label="Số điện thoại"
					onChange={(e) =>
						setForm({
							...form,
							phoneNumber: e.target.value,
						})
					}
					placeholder="Số điện thoại"
					value={form.phoneNumber} 
					variant="outlined"
					inputProps={{style: {fontSize: "17px"}}}
				/>
				<TextField
					sx={styles.textField}
					name="address"
					label="Địa chỉ"
					placeholder="Địa chỉ"
					onChange={(e) =>
						setForm({ ...form, address: e.target.value })
					}
					value={form.address}
					variant="outlined"
					inputProps={{style: {fontSize: "17px"}}}
				/>
				<TextField
					sx={styles.textField}
					name="city"
					label="Tỉnh/thành phố"
					placeholder="Tỉnh/thành phố"
					onChange={(e) =>
						setForm({ ...form, city: e.target.value })
					}
					value={form.city}
					variant="outlined"
					inputProps={{style: {fontSize: "17px"}}}
				/>
				<TextField
					sx={styles.textField}
					name="country"
					label="Quốc gia"
					placeholder="Quốc gia"
					onChange={(e) =>
						setForm({ ...form, country: e.target.value })
					}
					value={form.country}
					variant="outlined"
				/>
				<Container sx={{ textAlign: "center", mt: 2 }}>
					{paymentChooseNewAddress == false && (
						<Button
							sx={styles.cancelBtn}
							onClick={() => setAppear(false)}
							size="small"
						>
							Hủy bỏ
						</Button>
					)}
					<Button
						sx={styles.submitBtn}
						onClick={(e) => handleSubmit(e)}
						size="small"
						type="submit"
					>
						Lưu
					</Button>
				</Container>
			</FormControl>
		</Box>
	);
};

export default FormAddress;
