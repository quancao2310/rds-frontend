import { React, useEffect, useState } from "react";
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

import { withStyles } from "@mui/styles";

const FormAddress = ({ form, setForm, classes }) => {

	return (
		<Box sx={{ p: 2, my: 1 }}>
			<FormControl fullWidth="true" className="w-full">
				<TextField
					sx={styles.textData}
					name="name"
					label="Họ tên"
					InputLabelProps={{className: classes.input}}
					inputProps={{ className: classes.input }}
					onChange={(e) =>
						setForm({ ...form, name: e.target.value })
					}
					placeholder="Họ tên"
					value={form.name}
					variant="standard"
				/>
				<TextField
					sx={styles.textData}
					name="address"
					label="Địa chỉ"
					onChange={(e) =>
						setForm({
							...form,
							address: e.target.value,
						})
					}
					InputLabelProps={{className: classes.input}}
					inputProps={{ className: classes.input }}
					placeholder="Địa chỉ"
					value={form.address}
					variant="standard"
				/>
				<TextField
					sx={styles.textData}
					name="phoneNumber"
					label="Số điện thoại"
					placeholder="Số điện thoại"
					onChange={(e) =>
						setForm({ ...form, phoneNumber: e.target.value })
					}
					InputLabelProps={{className: classes.input}}
					inputProps={{ className: classes.input }}
					value={form.phoneNumber}
					variant="standard"
				/>
				<TextField
					sx={styles.textData}
					name="email"
					label="Email"
					placeholder="Email"
					onChange={(e) =>
						setForm({ ...form, email: e.target.value })
					}
					InputLabelProps={{className: classes.input}}
					inputProps={{ className: classes.input }}
					value={form.email}
					variant="standard"
				/>
				<TextField
					sx={styles.textData}
					name="discountCode"
					label="Mã giảm giá"
					placeholder="Type your city here"
					onChange={(e) =>
						setForm({ ...form, discountCode: e.target.value })
					}
					InputLabelProps={{className: classes.input}}
					inputProps={{ className: classes.input }}
					value={form.discountCode}
					variant="standard"

				/>
			</FormControl>
		</Box>
	);
};

const styles = {
	textData: {
		mb: 2,	
		fontSize:"50px",
	},
}

const muiStyles = {
	input: {
		"&:-webkit-autofill": {
		  WebkitBoxShadow: "0 0 0 1000px white inset"
		},
		fontSize: "17px !important",
	}
}

export default withStyles(muiStyles)(FormAddress);
