import { StyleSheet } from 'react-native'

const ContactStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		paddingTop: 30,
		alignItems: 'center',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		width: '100%',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 20,
	},
	list: { flex: 1, width: '90%' },
	listItem: {
		width: '100%',
		height: 100,

		borderRadius: 15,
		flexDirection: 'row',
		marginBottom: 15,
	},
	listIcon: {
		height: '100%',
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	listContact: { fontSize: 17, color: 'white' },
	listBoxInfos: {
		justifyContent: 'center',
		width: '80%',
		height: '100%',
	},
})

export {ContactStyles}
