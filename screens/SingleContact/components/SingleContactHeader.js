// Import react element
import * as React from 'react'
import {
	Text,
	View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import {SingleContactStyle as styles} from '../styles/SingleContactStyles'

const SingleContactHeader = (props) => {
	const { client } = props
	const theme = useTheme()

	return (
		<View style={styles.header}>
			<View
				style={{
					...styles.icon,
					backgroundColor: theme.colors.primary,
				}}
			>
				<Icon name="user" size={50} color="white" />
			</View>
			<Text style={styles.title}>
				{client.firstname} {client.lastname}
			</Text>
		</View>
	)
}

export default SingleContactHeader
