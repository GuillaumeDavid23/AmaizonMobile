import * as React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { useTheme, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ContactStyles as styles } from '../styles/ContactStyles'
import CustomButton from '../../../components/CustomButtonIcon'
import ItemDialog from './ItemDialog'

const ContactListItem = ({ data, navigation, index }) => {
	const [visible, setVisible] = React.useState(false)

	const showDialog = () => setVisible(true)

	const hideDialog = () => setVisible(false)

	const theme = useTheme()

	return (
		<View>
			<TouchableOpacity
				style={{ width: '100%' }}
				activeOpacity={0.8}
				onPress={showDialog}
			>
				<View
					style={{
						...styles.listItem,
						backgroundColor: theme.colors.primary,
					}}
				>
					<View style={styles.listIcon}>
						<Icon name="user" size={25} color="white" />
					</View>
					<View style={styles.listBoxInfos}>
						<Text style={{ ...styles.listContact, fontSize: 20 }}>
							{data.firstname} {data.lastname}
						</Text>
						<Icon name="eye" size={25} color="white" />
					</View>
				</View>
			</TouchableOpacity>
			<ItemDialog
				visible={visible}
				hideDialog={hideDialog}
				data={data}
				navigation={navigation}
				index={index}
			/>
		</View>
	)
}

export default ContactListItem
