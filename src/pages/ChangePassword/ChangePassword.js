import { React, useState } from "react"
import {
	Box,
	Container,
	Typography,
	Button,
	FormControl,
	CardContent,
	Card,
	InputAdornment,
	IconButton,
	Input,
} from "@mui/material"
import icons from "../../constant/icons"
import styles from "./ChangePassword.styles"
import { useDispatch } from "react-redux"
import { changePasswordApi } from "../../api/authApi"
import { toast } from "react-toastify"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { logOut } from "../../store/actions/authAction"

const ChangePassword = () => {
	const [form, setForm] = useState({
		curPassword: "",
		newPassword: "",
		rePassword: ""
	});
	const accessToken = localStorage.getItem('accessToken');
	const dispatch = useDispatch()
    const history = useHistory()
    const handleSignOut = () => {
        dispatch(logOut(history));
    }
	const [showPassword, setShowPassword] = useState(false);


	function handleSubmit(e) {
		e.preventDefault();
		changePasswordApi(accessToken, form)
			.then(() => {
				toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại!");
				setTimeout(() => {
					handleSignOut();
				}, 1000);
			})
			.catch((error) => {
				toast.error(error.response.data.message);
			});
	}


	return (
		<Box sx={styles.box}>
			<Container maxWidth="md">
				<Box sx={styles.titleWrapper}>
					<Typography sx={styles.title}>Đổi mật khẩu</Typography>
				</Box>
				<Card sx={styles.addressCard}>
					<CardContent className="w-full">
						<Box sx={styles.box1}>
							<FormControl fullWidth="true" className="w-full">
								<label>Mật khẩu hiện tại</label>
								<Input
									sx={{ ...styles.input }}
									value={form.curPassword}
									onChange={(e) => setForm({ ...form, curPassword: e.target.value })}
									type={showPassword ? 'text' : 'password'}
									placeholder="Mật khẩu hiện tại"
									disableUnderline
									fullWidth
									inputProps={{ style: { padding: 0 } }}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => { setShowPassword(!showPassword)}}
												onMouseDown={(e) => { e.preventDefault() }}
												edge="end"
											>
												{showPassword ? <icons.HideIcon style={styles.showPWIcon} /> : <icons.ShowIcon style={styles.showPWIcon} />}
											</IconButton>
										</InputAdornment>
									}
								/>
								<label>Mật khẩu mới</label>
								<Input
									sx={{ ...styles.input }}
									value={form.newPassword}
									onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
									type={showPassword ? 'text' : 'password'}
									placeholder="Mật khẩu hiện tại"
									disableUnderline
									fullWidth
									inputProps={{ style: { padding: 0 } }}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => { setShowPassword(!showPassword)}}
												onMouseDown={(e) => { e.preventDefault() }}
												edge="end"
											>
												{showPassword ? <icons.HideIcon style={styles.showPWIcon} /> : <icons.ShowIcon style={styles.showPWIcon} />}
											</IconButton>
										</InputAdornment>
									}
								/>
								<label>Xác nhận mật khẩu</label>
								<Input
									sx={{ ...styles.input }}
									value={form.rePassword}
									onChange={(e) => setForm({ ...form, rePassword: e.target.value })}
									type={showPassword ? 'text' : 'password'}
									placeholder="Mật khẩu hiện tại"
									disableUnderline
									fullWidth
									inputProps={{ style: { padding: 0 } }}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() => { setShowPassword(!showPassword)}}
												onMouseDown={(e) => { e.preventDefault() }}
												edge="end"
											>
												{showPassword ? <icons.HideIcon style={styles.showPWIcon} /> : <icons.ShowIcon style={styles.showPWIcon} />}
											</IconButton>
										</InputAdornment>
									}
								/>
								<Container sx={{ textAlign: "end", mt: 2 }} className="!px-0">
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
					</CardContent>
				</Card>
				

			</Container>
		</Box>
	)
}

export default ChangePassword
