import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import CustomButton from '../../components/CustomButtonIcon'
import { useSelector, useDispatch } from 'react-redux'
import { ClientSearchStyles as styles } from './styles/ClientSearchStyles'
import ClientSearchForm from './components/ClientSearchForm'
import { getClient } from '../../services/Contact'
import CustomSnackBar from '../../components/CustomSnackBar'
export default function ClientSearch({ route, navigation }) {
		const { client } = route.params
		const [snackVisible, setSnackVisisble] = React.useState(false)

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Recherche de {client.lastname} {client.firstname}
			</Text>
			<ClientSearchForm clientId={client._id} snackVisible={snackVisible} setSnackVisisble={setSnackVisisble} />
			<CustomSnackBar
				title="Validé"
				text="Les données ont été enregistrées"
				type="success"
				setVisible={setSnackVisisble}
				visible={snackVisible}
			/>
		</View>
	)
}

