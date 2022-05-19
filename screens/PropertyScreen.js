import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector } from 'react-redux'
import logo from '../assets/images/logoFull.png'

export default function PropertyScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			<Text style={styles.title}>Menu Propriétés</Text>
			<View
				style={{
					width: '100%',
					height: '80%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={30} name="home" color={color} />
					)}
					text="Listing des Propriétés"
					labelStyle={{ fontSize: 17 }}
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 60,
						width: '80%',
						marginBottom: 30,
					}}
					onPress={() => navigation.navigate('PropertyList')}
				/>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={30} name="wpforms" color={color} />
					)}
					text="Etat des lieux"
					labelStyle={{ fontSize: 17 }}
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 60,
						width: '80%',
					}}
					onPress={() => navigation.navigate('Inventory')}
				/>
			</View>
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
