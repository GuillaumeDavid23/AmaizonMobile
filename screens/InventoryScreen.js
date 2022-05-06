import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector, useDispatch } from 'react-redux'

export default function InventoryScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Menu Propriétés</Text>
			<CustomButton
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				text="Voir la liste de propriétés"
				labelStyle={{ fontSize: 17 }}
				reversed={true}
				style={{ height: 60, width: '90%', justifyContent: 'center' }}
				onPress={() => navigation.navigate('PropertyList')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		paddingTop: 50,
		alignItems: 'center',
	},
	logo: {
		height: 200,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 20
	},
})
