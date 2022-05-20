import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector, useDispatch } from 'react-redux'
import tinyLogo from '../assets/images/logo.png'
import logo from '../assets/images/logoFull.png'
import { BottomNavigation } from 'react-native-paper'

const MyNavigation = ({ navigation }) => {
	const [index, setIndex] = React.useState(0)
	const [routes] = React.useState([
		{ key: 'contacts', title: 'Contacts', icon: 'queue-music' },
		{ key: 'properties', title: 'Propriétés', icon: 'history' },
		{ key: 'home', title: 'Accueil', icon: 'home' },
		{ key: 'profile', title: 'Mon compte', icon: 'home' },
	])

	const renderScene = BottomNavigation.SceneMap({
		contacts: navigation.navigate('Home'),
		properties: navigation.navigate('Home'),
		home: navigation.navigate('Home'),
		profile: navigation.navigate('Login'),
	})

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	)
}

export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={tinyLogo} />
			<Image style={styles.fullLogo} source={logo} />

			<Text style={{ fontSize: 25 }}>Bonjour {user.firstname} ! </Text>
			<Text
				style={{
					fontSize: 25,
					textAlign: 'center',
					marginTop: 30,
					fontWeight: '300',
				}}
			>
				Que souhaitez vous faire {'\n'} aujourd'hui ?{' '}
			</Text>

			<CustomButton
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				text="Faire un état des lieux"
				reversed={true}
				style={{
					marginBottom: 30,
					marginTop: 50,
					height: 60,
					width: '90%',
					justifyContent: 'center',
				}}
				labelStyle={{ fontSize: 17 }}
				onPress={() => navigation.navigate('Inventory')}
			/>
			<CustomButton
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				text="Ajouter un bien"
				reversed={true}
				style={{
					marginBottom: 30,
					height: 60,
					width: '90%',
					justifyContent: 'center',
				}}
				labelStyle={{ fontSize: 17 }}
				onPress={() => navigation.navigate('AddProperty')}
			/>
			<CustomButton
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				text="Accéder aux contacts"
				labelStyle={{ fontSize: 17 }}
				reversed={true}
				style={{ height: 60, width: '90%', justifyContent: 'center' }}
				onPress={() => navigation.navigate('Contact')}
			/>
			{/* <MyNavigation navigation={navigation} /> */}
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
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	logo: {
		height: 200,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
	},
})
