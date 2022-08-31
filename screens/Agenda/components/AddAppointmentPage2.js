import { useState, useEffect } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { TextInput, Checkbox } from 'react-native-paper'
import CustomButton from '../../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import { searchClient } from '../../../services/Contact'
import { getAllProperties } from '../../../services/Property'

const AddAppointmentPage2 = ({
	display,
	setVisiblePage,
	handleSubmit,
	onSubmit,
	token,
	buyerSelected,
	setBuyerSelected,
	propertySelected,
	setPropertySelected,
}) => {
	// Listing des propriétés:
	const [properties, setProperties] = useState([])
	useEffect(() => {
		getAllProperties(token)
			.then((res) => {
				setProperties(res.properties)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	// Recherche du Buyer:
	const [searchBuyer, setSearchBuyer] = useState('')
	const [buyers, setBuyers] = useState([])
	useEffect(() => {
		if (searchBuyer.length > 0) {
			searchClient(token, searchBuyer)
				.then((res) => {
					setBuyers(res.datas)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [searchBuyer])

	return (
		<View style={{ display }}>
			<Text>Sélectionner le client:</Text>
			<View style={{ height: 30 }}>
				<TextInput
					onChangeText={setSearchBuyer}
					value={searchBuyer}
					style={{
						height: 30,
						border: '1px solid grey',
						backgroundColor: 'white',
						marginTop: 10,
					}}
				/>
			</View>

			<ScrollView style={{ height: 100, marginVertical: 20 }}>
				{buyers.map((buyer) => {
					return (
						<View
							key={buyer._id}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Checkbox
								status={
									buyerSelected === buyer._id
										? 'checked'
										: 'unchecked'
								}
								onPress={() => {
									setBuyerSelected(
										buyerSelected !== buyer._id
											? buyer._id
											: null
									)
								}}
							/>
							<Text>
								{buyer.lastname} {buyer.firstname}
							</Text>
						</View>
					)
				})}
			</ScrollView>

			<Text>Propriétés (facultatif):</Text>
			<ScrollView style={{ height: 250, marginBottom: 10 }}>
				{properties.map((property) => {
					return (
						<View
							key={property._id}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Checkbox
								status={
									propertySelected === property._id
										? 'checked'
										: 'unchecked'
								}
								onPress={() => {
									setPropertySelected(
										propertySelected !== property._id
											? property._id
											: null
									)
								}}
							/>
							<Text>{property.title}</Text>
						</View>
					)
				})}
			</ScrollView>

			<CustomButton
				style={{ marginVertical: 15, marginHorizontal: 25 }}
				text="Précédent"
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-left" color={color} />
				)}
				onPress={() => setVisiblePage(1)}
			/>
			<CustomButton
				style={{ marginBottom: 25, marginHorizontal: 25 }}
				text="Ajouter"
				CustomIcon={(size, color) => (
					<Icon size={size} name="plus" color={color} />
				)}
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	)
}

export default AddAppointmentPage2
