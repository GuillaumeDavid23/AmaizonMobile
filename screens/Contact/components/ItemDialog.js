import * as React from 'react'
import { Linking } from 'react-native'
import { useTheme, Portal, Dialog, Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../../../components/CustomButtonIcon'
import { ContactStyles as styles } from '../styles/ContactStyles'

const ItemDialog = ({ visible, hideDialog, data, navigation, index, anime }) => {

	const theme = useTheme()

	return (
		<Portal>
			<Dialog
				visible={visible}
				onDismiss={hideDialog}
				style={{
					...styles.dialog,
					backgroundColor: 'white',
					transform: [{ translateX: anime }],
				}}
			>
				<Dialog.Title
					style={{
						color: theme.colors.primary,
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
							height: 50,
							width: '90%',
							alignSelf: 'center',
							marginTop: 20,
						}}
						labelStyle={{ fontSize: 14 }}
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
							height: 50,
							width: '90%',
							alignSelf: 'center',
							marginTop: 20,
						}}
						labelStyle={{ fontSize: 14 }}
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
							height: 50,
							width: '90%',
							alignSelf: 'center',
							marginTop: 20,
						}}
						labelStyle={{ fontSize: 14 }}
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