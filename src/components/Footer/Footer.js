import React, { useState } from 'react';
import styles from './Footer.style';
import { Container, Input, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { icons } from '../../constant';
import { toast } from 'react-toastify';

const Footer = () => {
	const [email, setEmail] = useState("");

	const validateEmail = (email) => {
		return String(email)
		  .toLowerCase()
		  .match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		  );
	};

	const handleSignup = () => {
		if (validateEmail(email)) {
			toast.success("Đăng ký thành công")
		}
		else {
			toast.error("Vui lòng điền địa chỉ email")
		}
	}
	return (
		<>
			<Box sx={styles.footer}>
				<Container maxWidth="xs">
					<Grid container spacing={1}>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.Facebook sx={styles.icon} />
						</Grid>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.Twitter sx={styles.icon} />
						</Grid>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.Google sx={styles.icon} />
						</Grid>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.Instagram sx={styles.icon} />
						</Grid>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.LinkedIn sx={styles.icon} />
						</Grid>
						<Grid item xs={2} sx={styles.iconWrapper}>
							<icons.GitHub sx={styles.icon} />
						</Grid>
					</Grid>
				</Container>
				<Container maxWidth="lg">
					<Grid
						container
						spacing={0}
						mt={1}
						sx={styles.newsletterWrapper}
					>
						<Grid item lg={3} xs={12}>
							<Typography sx={styles.signUp}>
								Đăng ký nhận thông báo về sản phẩm mới
							</Typography>
						</Grid>
						<Grid item lg={6} xs={12}>
							<Input
								placeholder="Địa chỉ email"
								disableUnderline
								sx={styles.textField}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type='email'
							/>
						</Grid>
						<Grid item lg={3} xs={12} sx={styles.btnWrapper}>
							<Button sx={styles.subscribeBtn} variant="outlined" onClick={handleSignup}>
								Đăng ký
							</Button>
						</Grid>
					</Grid>
				</Container>
				<Box sx={styles.addressWrapper}>
					<Box>
						<Typography sx={styles.address}>
						Trường Đại học Bách khoa - ĐHQG-HCM - Việt Nam
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box sx={styles.bottomFooter}>
				<Box>
					<Typography sx={styles.copyright}>© 2024 Copyright: Regional Delicacy Shop</Typography>
				</Box>
			</Box>
		</>
	);
};

export default Footer;
