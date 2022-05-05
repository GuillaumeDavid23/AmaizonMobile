import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../../components/CustomButtonIcon'
import { useSelector, useDispatch } from 'react-redux'
import { ClientSearchStyles as styles } from './styles/ClientSearchStyles'
import ClientSearchForm from './components/ClientSearchForm'
export default function ClientSearch({ route, navigation }) {
		const { client, index } = route.params
		const [clientInfos, setClientInfos] = React.useState(client)
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Page d'ajout de recherche</Text>
			<ClientSearchForm client={clientInfos} setClient={setClientInfos} index={index} />
		</View>
	)
}

