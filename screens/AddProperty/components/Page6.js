import { useState, useEffect } from 'react'
import { TextInput, Checkbox } from 'react-native-paper'
import { Text, View } from 'react-native'
import { searchClient } from '../../../services/Contact'

const Page6 = ({ display, token, checked, setChecked }) => {
	// Recherche du Seller:
	const [searchSeller, setSearchSeller] = useState('')
	const [sellers, setSellers] = useState([])
	useEffect(() => {
		if (searchSeller.length > 0) {
			searchClient(token, searchSeller)
				.then((res) => {
					setSellers(res.datas)
				})
				.catch((err) => {
					console.log(err)
				})
		}
		//Get ALL des vendeurs et affichage A FAIRE !!
	}, [searchSeller])

	return (
		<View style={{ display }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Nom du vendeur:
			</Text>

			<View style={{ height: 30, marginVertical: 20 }}>
				<TextInput
					onChangeText={setSearchSeller}
					value={searchSeller}
					style={{
						height: 30,
						border: '1px solid grey',
						backgroundColor: 'white',
					}}
				/>
			</View>

			<View style={{ marginBottom: 20 }}>
				{sellers.map((seller) => {
					return (
						<View
							key={seller._id}
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
							}}
						>
							<Text>
								{seller.lastname} {seller.firstname}
							</Text>
							<Checkbox
								status={
									checked === seller._id
										? 'checked'
										: 'unchecked'
								}
								onPress={() => {
									setChecked(
										checked !== seller._id
											? seller._id
											: null
									)
								}}
							/>
						</View>
					)
				})}
			</View>
		</View>
	)
}

export default Page6
