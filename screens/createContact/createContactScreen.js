// Import react element
import * as React from 'react'
import {
	Linking,
	ScrollView,
	SafeAreaView,
} from 'react-native'

//Import fetch method
import SingleContactHeader from './components/CreateContactHeader'

//import style
import { SingleContactStyle as styles } from './styles/SingleContactStyles'
import SingleContactForm from './components/CreateContactForm'

export default function CreateContactScreen({ navigation }) {
	const [client, setClient] = React.useState({})
	
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<SingleContactHeader client={client} />
				{/* FORM START */}
				<SingleContactForm
					client={client}
					setClient={setClient}
					navigation={navigation}
				/>
				{/* FORM END */}
			</ScrollView>
		</SafeAreaView>
	)
}
