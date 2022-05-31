import { DataTable } from 'react-native-paper'
import { ScrollView, Text, View, Dimensions } from 'react-native'
import CustomButton from '../../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'

const Page8 = ({
	display,
	datasToDisplay,
	seller,
	datasToValidate,
	handleValidation,
}) => {
	return (
		<ScrollView style={{ display, width: Dimensions.get('screen').width }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Récapitulatif:
			</Text>
			{datasToDisplay && (
				<View>
					<DataTable>
						{Object.keys(datasToDisplay).map((key) => {
							return (
								<DataTable.Row key={key}>
									<DataTable.Cell>{key}</DataTable.Cell>
									<View
										style={{
											flex: 1,
											justifyContent: 'center',
										}}
									>
										{/* Tableaux: */}
										{typeof datasToDisplay[key] ===
											'object' &&
											!datasToDisplay[key].name && (
												<Text>
													{datasToDisplay[key].join(
														', '
													)}
												</Text>
											)}
										{/* Photos prises: */}
										{typeof datasToDisplay[key] ===
											'object' &&
											datasToDisplay[key].name && (
												<Text>Photo prise</Text>
											)}
										{/* Strings: */}
										{typeof datasToDisplay[key] ===
											'string' &&
											datasToDisplay[key] !==
												'[object Object]' && (
												<Text>
													{datasToDisplay[key]}
												</Text>
											)}
										{/* Photos non-prises: */}
										{datasToDisplay[key] ===
											'[object Object]' && (
											<Text>Photo non prise</Text>
										)}
										{/* Booleans true: */}
										{typeof datasToDisplay[key] ===
											'boolean' &&
											datasToDisplay[key] && (
												<Text>Oui</Text>
											)}
										{/* Booleans false: */}
										{typeof datasToDisplay[key] ===
											'boolean' &&
											!datasToDisplay[key] && (
												<Text>Non</Text>
											)}
									</View>
								</DataTable.Row>
							)
						})}
						<DataTable.Row>
							<DataTable.Cell>
								<Text>Client</Text>
							</DataTable.Cell>
							<DataTable.Cell>
								<Text>
									{seller.lastname} {seller.firstname}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
				</View>
			)}
			<View style={{ alignItems: 'center' }}>
				<CustomButton
					style={{ marginVertical: 20, width: '90%' }}
					text="Retour"
					CustomIcon={(size, color) => (
						<Icon size={size} name="arrow-left" color={color} />
					)}
					onPress={() => handleNavigation('previous')}
				/>
				{/* Submit Button */}
				<CustomButton
					style={{ marginBottom: 20, width: '90%' }}
					text="Valider"
					CustomIcon={(size, color) => (
						<Icon size={size} name="check" color={color} />
					)}
					onPress={() => handleValidation(datasToValidate)}
					reversed
				/>
			</View>
		</ScrollView>
	)
}

export default Page8
