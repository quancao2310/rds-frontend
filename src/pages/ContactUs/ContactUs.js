import { React } from 'react';
import { Typography, Box, Container, Grid, Link } from '@mui/material';
import { FeedbackForm } from '../../components/FeedbackForm/FeedbackForm';
import styles from './ContactUs.styles';

const mailURL = 'regionaldelicacyshop@gmail.com';
const websiteURL = 'http://www.regionaldelicacyshop.vn';

const ContactUs = () => {
	return (
		<Container sx={{ mt: '20px', mb: '20px' }}>
			<Typography sx={styles.title}>Contact us</Typography>
			<Grid container spacing={4}>
				<Grid item xs={12} md={6}>
					<Box>
						<hr />
						<Typography sx={styles.textContent}>
							Contact us if you have any problem while visiting
							our website
						</Typography>
						<Typography sx={styles.textContent}>
							(24/7 Support) Hotline: <b>0123-456-789</b>
						</Typography>
						<FeedbackForm websiteURL={websiteURL} />
					</Box>
				</Grid>
				<Grid item xs={12} md={6} sx={{ m: '20px 0' }}>
					<Box>
						<iframe
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6589.4363121897895!2d106.80032630791546!3d10.879825382994996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a5568c997f%3A0xdeac05f17a166e0c!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBCw6FjaCBraG9hIC0gxJBIUUcgVFAuSENN!5e0!3m2!1svi!2s!4v1729742675018!5m2!1svi!2s'
							width='600'
							height='288'
							style={{ border: '0', maxWidth: '100%' }}
							loading='lazy'
						/>
						<Typography sx={styles.title}>Address</Typography>
						<hr />
						<Typography sx={styles.textContent}>
							Công ty TNHH Chín Thành Viên Đặc Sản Việt Nam
							<br />
							Trường Đại học Bách khoa - ĐHQG-HCM - Việt Nam
							<br />
							Email:{' '}
							<Link
								sx={styles.linkContent}
								onClick={(e) => {
									window.location = `mailto:${mailURL}}`;
									e.preventDefault();
								}}>
								{mailURL}
							</Link>
							<br />
							Website:{' '}
							<Link
								sx={styles.linkContent}
								onClick={(e) => {
									window.location = `http://${websiteURL}`;
									e.preventDefault();
								}}>
								{websiteURL}
							</Link>
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ContactUs;
