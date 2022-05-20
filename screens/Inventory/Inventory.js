import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function InventoryScreen({ navigation }) {
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
