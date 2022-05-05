import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useTheme } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../components/CustomButtonIcon'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ListItem = ({ data, navigation, index }) => {
	const theme = useTheme()

	return (
		<TouchableOpacity
			style={{ width: '100%' }}
			activeOpacity={0.8}
			onPress={() => {
				navigation.navigate('SingleContact', {
					infos: data,
					index: index,
				})
			}}
		>
			<View
				style={{
					width: '90%',
					height: 100,
					backgroundColor: theme.colors.primary,
					borderRadius: 15,
					flexDirection: 'row',
					marginBottom: 15,
				}}
			>
				<View
					style={{
						height: '100%',
						width: '20%',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Icon name="user" size={50} color="white" />
				</View>
				<View
					style={{
						justifyContent: 'center',
						width: '80%',
						height: '100%',
					}}
				>
					<Text style={{ fontSize: 20, color: 'white' }}>
						{data.firstname} {data.lastname}
					</Text>
					<Text style={{ fontSize: 17, color: 'white' }}>
						Téléphone : {data.phone ? data.phone : 'Non renseigné'}
					</Text>
					<Text style={{ fontSize: 17, color: 'white' }}>
						Email : {data.email ? data.email : 'Non renseigné'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default function ContactScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					marginBottom: 50,
					width: '100%',
				}}
			>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={20} name="arrow-left" color={color} />
					)}
					text="Retour"
					reversed={false}
					style={{
						justifyContent: 'center',
						height: 40,
					}}
					labelStyle={{ fontSize: 12 }}
					onPress={() => navigation.goBack()}
				/>
				<Text style={styles.title}>Page de contact</Text>
			</View>
			{user.agent.customers.map((customer, index) => {
				return (
					<ListItem
						key={index}
						data={customer}
						navigation={navigation}
						index={index}
					/>
				)
			})}
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
		marginBottom: 20,
	},
})
