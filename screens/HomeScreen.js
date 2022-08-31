import * as React from 'react'
import { StyleSheet, Text, View, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButtonIcon'
import { useSelector } from 'react-redux'
import tinyLogo from '../assets/images/logo.png'
import logo from '../assets/images/logoFull.png'
import { BottomNavigation } from 'react-native-paper'

export default function HomeScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	const slideAnime = React.useRef(new Animated.Value(-350)).current
	const slideAnime2 = React.useRef(new Animated.Value(-350)).current
	const slideAnime3 = React.useRef(new Animated.Value(-350)).current
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

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={tinyLogo} />
			<Image style={styles.fullLogo} source={logo} />

			<Text style={{ fontSize: 25, fontFamily: 'DosisSemiBold' }}>
				Bonjour {user.firstname} !{' '}
			</Text>
			<Text
				style={{
					fontSize: 25,
					textAlign: 'center',
					marginTop: 15,
					fontWeight: '300',
					fontFamily: 'Dosis',
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
					marginTop: 15,
					height: 60,
					width: '90%',
					justifyContent: 'center',
					transform: [{ translateX: slideAnime }],
				}}
				labelStyle={{ fontSize: 17 }}
				onPress={() =>
					navigation.navigate('Propriétés', {
						screen: 'Inventory',
						initial: false,
					})
				}
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
					transform: [{ translateX: slideAnime2 }],
				}}
				labelStyle={{ fontSize: 17 }}
				onPress={() =>
					navigation.navigate('Propriétés', {
						screen: 'AddProperty',
						initial: false,
					})
				}
			/>
			<CustomButton
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				text="Accéder aux contacts"
				labelStyle={{ fontSize: 17 }}
				reversed={true}
				style={{
					height: 60,
					width: '90%',
					justifyContent: 'center',
					transform: [{ translateX: slideAnime3 }],
				}}
				onPress={() => navigation.navigate('Clients')}
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
		justifyContent:'center',
		paddingBottom:30
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
	logo: {
		maxHeight: 200,
		resizeMode: 'contain',
	},
	title: {
		fontFamily: 'Dosis',
		fontWeight: 'bold',
		fontSize: 25,
	},
})
