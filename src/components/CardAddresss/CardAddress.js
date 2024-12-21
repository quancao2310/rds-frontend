import { React, useState } from "react";
import styles from './CardAddress.styles'
import {
	Card,
	CardContent,
	Typography,
	Button,
	IconButton,
	Box,
	CardActions,
	Container,
	FormControl,
	Input,
	InputLabel,
	Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import icons from "../../constant/icons";
import { ExitToAppSharp } from "@mui/icons-material";
import FormAddress from "../FormAddress/FormAddress";
import { style } from "@mui/system";

const CardAddress = ({ address, onDelete, onEdit, onReset, btnAppear = true }) => {
	const [modelAppear, setModelAppear] = useState(false);
	return (
		<Card sx={styles.addressCard}>
			<CardContent>
				<Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Email:</Typography>
					<Typography sx={styles.data}>{address?.email}</Typography>
				</Box>
				<Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Họ tên:</Typography>
					<Typography sx={styles.data}>{address?.name}</Typography>
				</Box>
				{/* <Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Số điện thoại:</Typography>
					<Typography sx={styles.data}>{address?.phoneNumber}</Typography>
				</Box>
				<Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Địa chỉ:</Typography>
					<Typography sx={styles.data}>{address?.address}</Typography>
				</Box>
				<Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Tỉnh/thành phố:</Typography>
					<Typography sx={styles.data}>{address?.city}</Typography>
				</Box>
				<Box sx={styles.infoWrapper}>
					<Typography sx={styles.title}>Quốc gia:</Typography>
					<Typography sx={styles.data}>{address?.country}</Typography>
				</Box> */}
			</CardContent>
			{btnAppear && (
				<Box>
					<CardActions sx={styles.actionsWrapper}>
						<IconButton
							onClick={() => setModelAppear(true)}
							sx={styles.editBtn}
						>
							<icons.Edit sx={styles.icon} />
						</IconButton>
						{/* <IconButton
							onClick={() => onDelete(address.deliveryID)}
							sx={styles.deleteBtn}
						>
							<icons.Trashcan sx={styles.icon} />
						</IconButton> */}
					</CardActions>
					<Dialog
						open={modelAppear}
						onClose={() => setModelAppear(false)}
						sx={styles.dialog}
					>
						<DialogTitle sx={{textAlign: "center"}}>Chỉnh sửa hồ sơ</DialogTitle>
						<FormAddress
							address={address}
							formCommand="edit"
							formSubmit={onEdit}
							setAppear={setModelAppear}
							onReset={onReset}
						/>
					</Dialog>
				</Box>
			)}
		</Card>
	);
};
export default CardAddress;
