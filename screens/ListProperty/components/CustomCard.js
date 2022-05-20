import * as React from 'react'
import {
	Card,
	Button,
	Dialog,
	Portal,
} from 'react-native-paper'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconFW5 from 'react-native-vector-icons/FontAwesome5'

import { API_URL } from '@env'

const CustomCard = (props) => {
	const { property } = props
	const [visible, setVisible] = React.useState(false)

	const showDialog = () => setVisible(true)

	const hideDialog = () => setVisible(false)

	return (
		<Card style={styles.container}>
			<Card.Cover
				source={{
					uri:
						API_URL + property?.imageUrl?.photo1
							? API_URL + property?.imageUrl?.photo1
							: null,
				}}
			/>
			<Card.Title title={property.title} />
			<Card.Content>
				<View style={styles.listMarker}>
					<View style={{ alignItems: 'center' }}>
						<Icon name="map-marker" size={20} color="black" />
						<Text style={{ fontSize: 14, flex: 1 }}>
							{property?.location}{' '}
						</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<IconFW5 name="door-open" size={20} color="black" />
						<Text style={{ fontSize: 14, flex: 1 }}>
							{property?.roomNumber}{' '}
							{property?.roomNumber > 1 ? 'pièces' : 'pièce'}
						</Text>
					</View>
					<View style={{ alignItems: 'center' }}>
						<IconFW5
							name="drafting-compass"
							size={20}
							color="black"
						/>
						<Text style={{ fontSize: 14, flex: 1 }}>
							{property?.surface} m²
						</Text>
					</View>
				</View>
				<Text style={styles.price}>
					Prix : {property?.amount}{' '}
					<Icon name="euro" size={17} color="black" />
					{property?.transactionType === 'Location' ? ' / Mois' : ''}
				</Text>
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
					<Dialog.Title>{property?.title}</Dialog.Title>
					<ScrollView>
						<Dialog.Content>
							<Text>{property?.description}</Text>
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
