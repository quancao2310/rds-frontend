import * as React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormAddress from "../PaymentFormAddress/PaymentFormAddress";
import HorizontalProduct from "../HorizontalProduct/HorizontalProduct";
import { createOrder } from "../../api/orderApi";
import { Container, Box, Divider } from "@mui/material";

import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { removeAllCart } from "../../store/actions/cartAction";
import { checkEmptyForm } from "../../constant/function";
import styles from "./PaymentStepper.style";
import { getUserProfileApi } from "../../api/authApi";
import { toast } from "react-toastify";
import { getCartApi } from "../../api/cartApi";

const steps = ["Thông tin vận chuyển", "Danh sách thanh toán", "Hoàn thành"];
export default function PaymentStepper({
	idaddress,
	address,
	setAddress,
	setDisableAddress,
	cart,
}) {
	const history = useHistory();
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = React.useState(0);
	const [disableFinish, setDisableFinish] = React.useState(false);
	if (activeStep != 0) {
		setDisableAddress(true);
	} else {
		setDisableAddress(false);
	}

	const [form, setForm] = React.useState({
		name: "",
		address: "",
		phoneNumber: "",
		email: "",
		discountCode: ""
	});
	const [cartList, setCartList] = React.useState([]);
	const [totalQuantity, setTotalQuantity] = React.useState(0);
	const [totalPrice, setTotalPrice] = React.useState(0);

	const accessToken = localStorage.getItem('accessToken');

	const getUser = async () => {
		await getUserProfileApi(accessToken).then(response => {
			setForm({
				name: response.data?.name,
				address: "",
				phoneNumber: "",
				email: response.data?.email,
				discountCode: ""
			});
		})
	}

	const getCarts = async () => {
        await getCartApi(accessToken).then(response => {
            if (response.status === 200) {
                setCartList(response.data);
				setTotalPrice(response.data.reduce((total, cart) => total + cart.totalPrice, 0));
				setTotalQuantity(response.data.reduce((total, cart) => total + cart.quantity, 0));
            }
            else {
                console.log(response);
            }
        })
    };

	React.useEffect(() => {
		if (accessToken) {
			getUser();
			getCarts();
		}
	}, [])

	const handleNext = () => {
		if (activeStep == 0) {
			console.log(address);
			if (!checkEmptyForm(form)) setActiveStep(activeStep + 1);
			else {
				console.log('empty input');
				toast.error(checkEmptyForm(form));
				return;
			}
		} else if (activeStep == 1) {
			setDisableFinish(true);
			// let joinAddress =
			// 	address.addressInForm +
			// 	", " +
			// 	address.ward +
			// 	", " +
			// 	address.district +
			// 	", " +
			// 	address.city;
			// console.log("da gui");
			let cartIds = cartList.map( cartItem => { return cartItem.cartId;})
			createOrder(
				form.name,
				form.address,
				form.phoneNumber,
				form.email,
				cartIds,
				form.discountCode
			).then((res) => {
				console.log(7, res.data);
				if (res.status === 200) {
					// dispatch(removeAllCart());
					setActiveStep(activeStep + 1);
					toast.success("Thanh toán đơn hàng thành công, vui lòng theo dõi đơn hàng của bạn.")
				}
			})
			.catch((err) => {
				toast.error(err.response.data.message);
			});
		} else setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<Container sx={{ py: "80px" }}>
			<Typography sx={styles.myCart} className="pb-[30px]">
				Thanh toán
			</Typography>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					const stepProps = {};
					const labelProps = {};
					if (index == 0) {
						labelProps.optional = (
							<Typography variant="caption">
								Bạn có thể chỉnh sửa thông tin ở đây
							</Typography>
						);
					}
					return (
						<Step key={label} {...stepProps}>
							<StepLabel
								{...labelProps}
							>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			{activeStep === steps.length - 1 ? (
				<React.Fragment>
					<Typography sx={{ mt: 2, mb: 1 }}>
						Đơn hàng của bạn đã được đặt
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							pt: 2,
						}}>
						<Button
							onClick={() => history.push("/")}
							variant="outlined">
							Quay về trang chủ
						</Button>
					</Box>
				</React.Fragment>
			) : (
				<Container>
					<React.Fragment>
						{activeStep == 0 ? (
							<FormAddress
								form={form}
								setForm={setForm}
							/>
						) : (
							<Box sx={{
								my: 2,
								display: {
									xs: "block",
									md: "flex"
								}
							}}>
								<Box>
									<Typography
										sx={{
											fontSize: "18px",
											fontWeight: "bold",
											fontFamily: "Roboto Slab",
											mb: "12px",
										}}
									>Chi tiết giỏ hàng</Typography>
									{cartList.map((product) => (
										<>
											<HorizontalProduct
												imageSize={"15%"}
												product={product}
												noQuantityChange={true}
											/>
											<Divider />
										</>
									))}
								</Box>

								<Box
									sx={{
										ml:
										{
											xs: 0,
											md: "5%"
										},
										mt: {
											xs: "24px",
											md: "0",
										},
										width: {
											xs: "fit-content",
											md: "45%",
										},
									}}
								>
									<Typography
										sx={{
											fontSize: "18px",
											fontWeight: "bold",
											fontFamily: "Roboto Slab",
										}}
									>Chi tiết hóa đơn</Typography>
									<Box
										sx={{
											p: 2,
											mt: 2,
											border: 1,
											borderRadius: 3,
										}}>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Tổng số lượng:</b> {totalQuantity}
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Tổng số tiền:</b>{" "}
											{Intl.NumberFormat("vi-VN", {
												style: "currency",
												currency: "VND",
											}).format(totalPrice)}
										</Typography>
									</Box>

									<Typography
										sx={{
											fontSize: "18px",
											fontWeight: "bold",
											fontFamily: "Roboto Slab",
											mt: 3,
										}}
									>Thông tin vận chuyển</Typography>
									<Box
										sx={{
											p: 2,
											mt: 2,
											border: 1,
											borderRadius: 3,
										}}>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Họ tên người nhận:</b> {form.name}
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Địa chỉ:</b> {
												form.address
											}
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Số điện thoại:</b> {form.phoneNumber}
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Email:</b> {form.email}
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Phương thức thanh toán:</b> Thanh toán khi nhận hàng
										</Typography>
										<Typography
											sx={{ fontSize: { xs: "1rem" } }}>
											<b>Mã giảm giá:</b> {form.discountCode}
										</Typography>
									</Box>
								</Box>
							</Box>
						)}

						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								pt: 2,
							}}>
							<Button
								variant="outlined"
								color="inherit"
								disabled={activeStep === 0 || disableFinish}
								onClick={handleBack}
								sx={{ mr: 1 }}>
								Quay lại
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button
								onClick={handleNext}
								disabled={disableFinish}
								variant="outlined">
								{activeStep === steps.length - 2
									? "Hoàn thành"
									: "Tiếp tục"}
							</Button>
						</Box>
					</React.Fragment>
				</Container>
			)}
		</Container>
	);
}
