// import { makeStyles } from "@mui/styles"
const styles = {
	box: {
		minHeight: '80vh',
		backgroundColor: 'rgb(245, 245, 245)',
		paddingBottom: '100px',
        paddingTop: {
			xs: '30px',
			md: '50px',
		},
	},
	titleWrapper: {
		display: "flex",
		justifyContent: 'space-between',
		alignItems: "center",
		marginBottom: '25px',
	},
	title: {
        fontSize: {
            xs: "26px",
            md: "30px",
        },
        fontWeight: 'bold',
        textAlign: 'center',
    },
	box1: {
        p: {
            xs: 3,
            md: 5,
        },
        width: {
            md: "100%",
        },
    },
	textField: {
        mb: 2,
        width: "100%",
    },
	submitBtn: {
        backgroundColor: "#333333",
        color: "white",
        textTransform: "none",
        px: 2,
        py: 1,
        "&: hover": {
            backgroundColor: "#000000",
        },
    },
	addressCard: {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        padding: {
            xs: "5px",
            md: "15px 20px",
        },
        marginBottom: { xs: '14px', md: '20px' },
        flex: 1,
        borderRadius: {
            xs: "10px",
            md: "25px",
        },
        boxShadow: "none",
        userSelect: "none",
    },
	input: {
        padding: '17px 15px',
        width: '100%',
        borderRadius: '10px',
		mb: 2,
		border: '1px solid gray'
    },
}
export default styles