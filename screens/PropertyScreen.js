import * as React from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector } from 'react-redux'
import logo from '../assets/images/logoFull.png'

export default function PropertyScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	const slideAnime = React.useRef(new Animated.Value(650)).current
	const slideAnime2 = React.useRef(new Animated.Value(550)).current
	const slideAnime3 = React.useRef(new Animated.Value(450)).current
	const slideAnime4 = React.useRef(new Animated.Value(350)).current
	Animated.timing(slideAnime, {
		toValue: 0,
		duration: 500,
		useNativeDriver: true,
	}).start()
	Animated.timing(slideAnime2, {
		toValue: 0,
		duration: 500,
		delay: 250,
		useNativeDriver: true,
	}).start()
	Animated.timing(slideAnime3, {
		toValue: 0,
		duration: 500,
		delay: 500,
		useNativeDriver: true,
	}).start()
	Animated.timing(slideAnime4, {
		toValue: 0,
		duration: 500,
		delay: 750,
		useNativeDriver: true,
	}).start()
	
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
						transform: [{ translateY: slideAnime }],
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
						transform: [{ translateY: slideAnime2 }],
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
						transform: [{ translateY: slideAnime3 }],
					}}
					onPress={() => navigation.navigate('Inventory')}
				/>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={30} name="wpforms" color={color} />
					)}
					text="Voir les états des lieux"
					labelStyle={{ fontSize: 17 }}
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 60,
						marginTop: 30,
						width: '80%',
						transform: [{ translateY: slideAnime4 }],
					}}
					onPress={() => navigation.navigate('InventoryList')}
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
		fontFamily: 'DosisSemiBold',
		fontSize: 25,
		textDecorationLine: 'underline',
		marginTop: 50,
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	subtitle: {
		fontSize: 20,
		marginBottom: 20,
		fontFamily: 'Dosis',
	},
})
