// Import react element
import * as React from 'react'
import {
	Linking,
	ScrollView,
	SafeAreaView,
} from 'react-native'

//Import customs elements
import CustomButton from '../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'

//Import fetch method
import SingleContactHeader from './components/SingleContactHeader'

//import style
import { SingleContactStyle as styles } from './styles/SingleContactStyles'
import SingleContactForm from './components/SingleContactForm'

export default function SingleContactScreen({ route, navigation }) {
	const { infos, index } = route.params
	const [client, setClient] = React.useState(infos)

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<SingleContactHeader client={client} />
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={20} name="search" color={color} />
					)}
					text="Ajouter une recherche client"
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 40,
						width: '80%',
						alignSelf: 'center',
					}}
					labelStyle={{ fontSize: 12 }}
					onPress={() => navigation.navigate('ClientSearch')}
				/>
				{/* FORM START */}
				<SingleContactForm
					client={client}
					setClient={setClient}
					index={index}
				/>
				{/* FORM END */}

				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={20} name="phone" color={color} />
					)}
					text="Contacter par téléphone"
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 40,
						width: '80%',
						alignSelf: 'center',
						marginTop: 20,
					}}
					labelStyle={{ fontSize: 12 }}
					onPress={() => Linking.openURL(`tel:${client.phone}`)}
				/>
				<CustomButton
					CustomIcon={(size, color) => (
						<Icon size={20} name="envelope" color={color} />
					)}
					text="Contacter par Mail"
					reversed={true}
					style={{
						justifyContent: 'center',
						height: 40,
						width: '80%',
						alignSelf: 'center',
						marginTop: 20,
						marginBottom: 50,
					}}
					labelStyle={{ fontSize: 12 }}
					onPress={() => Linking.openURL(`mailto:${client.email}`)}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}
