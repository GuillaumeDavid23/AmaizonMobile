import * as React from 'react'
import {
	Card,
	Button,
	Dialog,
	Portal,
	Paragraph,
	Title,
} from 'react-native-paper'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFW5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import { API_URL } from '@env'

const CustomCard = (props) => {
	const { inventory } = props
	const [visible, setVisible] = React.useState(false)
	const showDialog = () => setVisible(true)

	const hideDialog = () => setVisible(false)
	const StatsName = {
		electric: 'électrique',
		gaz: 'gaz',
		water: 'eau',
	}
	const EtatNames = {
		1: 'Très mauvais',
		2: 'Mauvais',
		3: 'Moyen',
		4: 'Bon',
		5: 'Très bon',
		6: 'Parfait',
	}
	return (
		<Card style={styles.container}>
			<Card.Title
				title={
					'Etat des lieux du :' +
					' ' +
					moment(inventory.date).format('DD/MM/YYYY')
				}
			/>
			<Card.Content>
				<View style={styles.listMarker}>
					<Paragraph>
						Fait par : {inventory?.id_agent?.firstname}
					</Paragraph>
				</View>
			</Card.Content>
			<Card.Actions style={{ alignSelf: 'flex-end' }}>
				<Button onPress={showDialog}>
					Voir Plus <Icon name="arrow-right" size={18} />
				</Button>
			</Card.Actions>
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideDialog}
					style={{ maxHeight: 600 }}
				>
					<Dialog.Title>
						Etat des lieux du :{' '}
						{moment(inventory.date).format('DD/MM/YYYY')}
					</Dialog.Title>
					<ScrollView>
						<Dialog.Content>
							<View>
								<Title style={{ alignSelf: 'center' }}>
									Relevé de compteur
								</Title>
								{inventory.lst_statsMeters.map(
									(stats, index) => {
										return (
											<View key={index}>
												<Title>
													Compteur{' '}
													{StatsName[stats.name]}
												</Title>
												<Text>
													Référence : {stats.ref}
												</Text>
												<Text>
													Montant : {stats.value}
												</Text>
											</View>
										)
									}
								)}
							</View>
							<View>
								<Title style={{ alignSelf: 'center' }}>
									Etat des pièces :
								</Title>
								{inventory.lst_roomDetails.map(
									(room, index) => {
										return (
											<View key={index}>
												<Title>{room.name}</Title>
												<Text>
													Condition :{' '}
													{EtatNames[room.condition]}
												</Text>
											</View>
										)
									}
								)}
							</View>
						</Dialog.Content>
					</ScrollView>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Fermer</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</Card>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 30,
		marginVertical: 20,
	},
	price: {
		fontSize: 17,
		textAlign: 'right',
		marginTop: 10,
		fontWeight: 'bold',
		alignItems: 'center',
	},
	listMarker: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
})

export default CustomCard
