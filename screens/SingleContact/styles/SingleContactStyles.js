import {
	StyleSheet,
} from 'react-native'

const SingleContactStyle = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: '#ECE6DE',
		alignItems: 'center',
	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
		paddingTop: 10,
		width: '100%',
	},
	icon: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 100,
		width: 100,
		borderRadius: 50,
	},
	scrollView: {
		backgroundColor: '#ECE6DE',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	dnone: {
		display: 'none'
	}
})

export {SingleContactStyle}
