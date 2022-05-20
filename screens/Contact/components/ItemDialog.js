import * as React from 'react'
import { StyleSheet, Text, View, Linking } from 'react-native'
import { useTheme, Portal, Dialog, Paragraph, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ContactStyles as styles } from '../styles/ContactStyles'
import CustomButton from '../../../components/CustomButtonIcon'

const ItemDialog = ({ visible, hideDialog, data, navigation, index }) => {

	const theme = useTheme()

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={hideDialog}
				style={{ backgroundColor: 'white' }}
			>
				<Dialog.Title
					style={{
						color: theme.colors.primary,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					{data.firstname} {data.lastname}
				</Dialog.Title>
				<Dialog.Content>
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
						onPress={() => Linking.openURL(`tel:${data.phone}`)}
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
						}}
						labelStyle={{ fontSize: 12 }}
						onPress={() => Linking.openURL(`mailto:${data.email}`)}
					/>
					<CustomButton
						CustomIcon={(size, color) => (
							<Icon size={20} name="pencil" color={color} />
						)}
						text="Editer le client"
						reversed={true}
						style={{
							justifyContent: 'center',
							height: 40,
							width: '80%',
							alignSelf: 'center',
							marginTop: 20,
						}}
						labelStyle={{ fontSize: 12 }}
						onPress={() => {
							hideDialog()
							navigation.navigate('SingleContact', {
								infos: data,
								index: index,
							})
						}}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button
						onPress={hideDialog}
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						Fermer
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	)
}

export default ItemDialog
