import { StyleSheet } from 'react-native'

const ClientSearchStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		paddingTop: 20,
		alignItems: 'center',
	},
	logo: {
		height: 200,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 50,
		textAlign: 'center',
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
})

export {ClientSearchStyles}