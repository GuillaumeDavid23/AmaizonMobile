import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ContactStyles as styles } from '../styles/ContactStyles'

const ContactListItem = ({ data, navigation, index }) => {
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
					...styles.listItem,
					backgroundColor: theme.colors.primary,
				}}
			>
				<View style={styles.listIcon}>
					<Icon name="user" size={50} color="white" />
				</View>
				<View style={styles.listBoxInfos}>
					<Text style={{ ...styles.listContact, fontSize: 20 }}>
						{data.firstname} {data.lastname}
					</Text>
					<Text style={styles.listContact}>
						Téléphone : {data.phone ? data.phone : 'Non renseigné'}
					</Text>
					<Text style={styles.listContact}>
						Email : {data.email ? data.email : 'Non renseigné'}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default ContactListItem
