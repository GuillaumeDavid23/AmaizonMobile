import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector } from 'react-redux'
import logo from '../assets/images/logoFull.png'

export default function PropertyScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			<View
				style={{
					width: '100%',
					height: '70%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={styles.title}>Propriétés</Text>
				<Text style={styles.subtitle}>Que voulez-vous faire ?</Text>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={30} name="home" color={color} />
					)}
					text="Lister les biens"
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
						<IconMCI
							size={30}
							name="home-plus-outline"
							color={color}
						/>
					)}
					text="Ajouter un bien"
					reversed={true}
					style={{
						marginBottom: 30,
						height: 60,
						width: '80%',
						justifyContent: 'center',
					}}
					labelStyle={{ fontSize: 17 }}
					onPress={() => navigation.navigate('AddProperty')}
				/>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={30} name="wpforms" color={color} />
					)}
					text="Faire un état des lieux"
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
		textDecorationLine: 'underline',
		marginTop: 50
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	subtitle: {
		fontSize: 20,
		marginBottom: 20,
		fontStyle: 'italic'
	}
})
