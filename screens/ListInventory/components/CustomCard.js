import * as React from 'react'
import {
	Card,
	Button,
	Dialog,
	Portal,
	Paragraph,
} from 'react-native-paper'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFW5 from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import { API_URL } from '@env'

const CustomCard = (props) => {
	const { inventory } = props
	const [visible, setVisible] = React.useState(false)
	console.log(inventory);
	const showDialog = () => setVisible(true)

	const hideDialog = () => setVisible(false)

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
					style={{ maxHeight: 400 }}
				>
					<Dialog.Title>
						Etat des lieux du :{' '}
						{moment(inventory.date).format('DD/MM/YYYY')}
					</Dialog.Title>
					<ScrollView>
						<Dialog.Content>
							{inventory.lst_statsMeters.map((stats, index) => {
								return (<View key={index}>
									<Text>{stats.name}</Text>
									<Text>{stats.ref}</Text>
									<Text>{stats.value}</Text>
								</View>)
							})}
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
