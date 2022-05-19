import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

export default function InventoryScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Etats des lieux</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		paddingTop: 30,
		alignItems: 'center',
	},
	logo: {
		height: 200,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 20,
	},
})
