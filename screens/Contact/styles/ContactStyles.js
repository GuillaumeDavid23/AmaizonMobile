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
	list: { flex: 1, width: '100%', marginBottom: 50 },
	listItem: {
		width: '100%',
		paddingVertical: 15,
		borderRadius: 15,
		flexDirection: 'row',
		marginBottom: 15,
		alignItems:'center'
	},
	listIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
		marginLeft: 10
	},
	listContact: { fontSize: 17, color: 'white' },
	listBoxInfos: {
		width:"75%",
		justifyContent: 'center',
		flexDirection:'row',
		justifyContent:'space-between'
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	dialog: {
		transform: [
			{
				translateY: -600
			}
		]
	}
})

export {ContactStyles}
