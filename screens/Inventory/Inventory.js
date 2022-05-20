import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import logo from '../../assets/images/logoFull.png'

export default function InventoryScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
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
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
})
