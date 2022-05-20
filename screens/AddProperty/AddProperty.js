// React imports
import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'

// HookForm imports
import { useForm, Controller } from 'react-hook-form'
// import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
// import { setAuth } from '../../redux/userSlice'

// Store imports:
import { createProperty } from '../../services/Property'

// Design imports
import {
	TextInput,
	Switch,
	Button,
	ProgressBar,
	Colors,
	DataTable,
} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomButton from '../../components/CustomButtonIcon'
import CustomSnackBar from '../../components/CustomSnackBar'
import { PaperSelect } from 'react-native-paper-select'

// Regex imports
import { REGSTRING, REGNUM, REGID } from '../../utils/regex'

export default function AddProperty({ navigation }) {
	// Récupération du token:
	const token = useSelector((state) => state.user.auth.token)

	// Déclaration options selects propertyType:
	const [propertyTypes, setPropertyTypes] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Maison' },
			{ _id: 2, value: 'Appartement' },
		],
		selectedList: [],
		error: '',
	})

	// Déclaration options selects transactionTypes:
	const [transactionTypes, setTransactionTypes] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Achat' },
			{ _id: 2, value: 'Location' },
		],
		selectedList: [],
		error: '',
	})

	// Déclaration options selects Stuffs:
	const [stuffs, setStuffs] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Sonnerie' },
			{ _id: 2, value: 'Interphone' },
			{ _id: 3, value: 'Alarme' },
			{ _id: 4, value: 'Cave' },
			{ _id: 5, value: 'Parking / Boxe / Garage' },
			{ _id: 6, value: 'Jardin' },
			{ _id: 7, value: 'Balcon / Terrasse' },
			{ _id: 8, value: 'Boite aux lettres' },
		],
		selectedList: [],
		error: '',
	})

	// Déclaration options selects Heat:
	const heatTypes = [
		{ _id: 1, value: 'Collectif' },
		{ _id: 2, value: 'Gaz' },
		{ _id: 3, value: 'Elec' },
		{ _id: 4, value: 'Autre' },
	]
	const [heatingTypes, setHeatingTypes] = useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})
	const [hotWaterTypes, sethotWaterTypes] = useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})

	// Gestion de la pagination:
	const [visiblePage, setVisiblePage] = useState(1)
	const [progress, setProgress] = useState(0)
	const handleNavigation = (previousOrNext) => {
		let newVisiblePage = visiblePage
		if (previousOrNext === 'previous') {
			newVisiblePage--
		} else if (previousOrNext === 'next') {
			// On check si des erreurs on été générés sur la page actuelle et dans ce cas, on bloque l'accès à la page suivante.
			if (
				!(errors.title || errors.propertyType || errors.description) &&
				visiblePage === 1
			) {
				newVisiblePage++
			} else if (
				!(
					errors.location ||
					errors.postalCode ||
					errors.city ||
					errors.country
				) &&
				visiblePage === 2
			) {
				newVisiblePage++
			} else if (
				!(
					errors.surface ||
					errors.roomNumber ||
					errors.electricMeterRef ||
					errors.gasMeterRef
				) &&
				visiblePage === 3
			) {
				newVisiblePage++
			} else if (
				!(
					errors.list_equipments ||
					errors.heatingType ||
					errors.hotWaterType
				) &&
				visiblePage === 4
			) {
				newVisiblePage++
			}
		}
		setVisiblePage(newVisiblePage)
		switch (newVisiblePage) {
			case 1:
				setProgress(0)
				break
			case 2:
				setProgress(0.2)
				break
			case 3:
				setProgress(0.4)
				break
			case 4:
				setProgress(0.6)
				break
			case 5:
				setProgress(0.8)
				break
			case 6:
				setProgress(1)
				break
			default:
		}
	}

	// Destructuring HookForm hook
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			title: 'Chouette Maison',
			location: "441 rue d'abbeville",
			postalCode: '80000',
			city: 'Amiens',
			country: 'France',
			surface: '250',
			roomNumber: '5',
			amount: '200000',
		},
	})

	// Gestion de l'affichage des erreurs:
	if (Object.keys(errors).length > 0 && visiblePage === 5) {
		if (errors.title || errors.propertyType || errors.description) {
			setVisiblePage(1)
		} else if (
			errors.location ||
			errors.postalCode ||
			errors.city ||
			errors.country
		) {
			setVisiblePage(2)
		} else if (
			errors.surface ||
			errors.roomNumber ||
			errors.electricMeterRef ||
			errors.gasMeterRef
		) {
			setVisiblePage(3)
		} else if (
			errors.list_equipments ||
			errors.heatingType ||
			errors.hotWaterType
		) {
			setVisiblePage(4)
		}
	}

	const [datasToValidate, setDatasToValidate] = useState([])
	const onSubmit = (data) => {
		// Hotfix isToSell:
		if (data.isToSell === undefined) {
			data.isToSell = true
		}

		// Temporaire, inclusion de propertyRef dans les datas:
		data['propertyRef'] = 'RDF5614326'

		// Récupération des valeurs dans le select list_equipments:
		if (data.list_equipments !== undefined) {
			let formattedSuffList = []
			data.list_equipments.selectedList.forEach((value) => {
				formattedSuffList.push(value.value)
			})
			data.list_equipments = formattedSuffList
		}

		// Récupération des valeurs dans les select propertyType et transactionType:
		data.propertyType = data.propertyType.selectedList[0].value
		data.transactionType = data.transactionType.selectedList[0].value

		// Formattage et unification des datas de chauffage:
		if (data.heatingType !== undefined || data.hotWaterType !== undefined) {
			let list_heater = []
			if (data.heatingType !== undefined) {
				list_heater.push(
					'Chauffage ' + data.heatingType.selectedList[0].value
				)
				delete data.heatingType
			}
			if (data.heatingType !== undefined) {
				list_heater.push(
					'Eau chaude ' + data.hotWaterType.selectedList[0].value
				)
				delete data.hotWaterType
			}
			data['list_heater'] = list_heater
		}

		// Formattage de l'adresse:
		data.location = [
			data.location,
			data.postalCode,
			data.city,
			data.country,
		]
		delete data.postalCode
		delete data.city
		delete data.country

		setDatasToValidate(data)
		handleNavigation('next')
	}

	// Affichage du tableau récapitulatif:
	const displaySummaryDataTable = (datas) => {
		return (
			<DataTable>
				{Object.keys(datas).map((key) => {
					return (
						<DataTable.Row key={key}>
							<DataTable.Cell>{key}</DataTable.Cell>
							<View style={{ flex: 1, justifyContent: 'center' }}>
								{typeof datas[key] === 'object' && (
									<Text>{datas[key].join(', ')}</Text>
								)}
								{typeof datas[key] === 'string' && (
									<Text>{datas[key]}</Text>
								)}
								{typeof datas[key] === 'boolean' &&
									datas[key] && <Text>Oui</Text>}
								{typeof datas[key] === 'boolean' &&
									!datas[key] && <Text>Non</Text>}
							</View>
						</DataTable.Row>
					)
				})}
			</DataTable>
		)
	}

	// Gestion de la validation:
	const handleValidation = (data) => {
		createProperty(data, token)
			// On Promise Successful
			.then((res) => {
				// // Formating datas
				// const dataFormat = {
				// 	token: data.token,
				// 	isLoggedIn: true,
				// 	data: data.data,
				// }
				// // Dispatching formatted data to redux store
				// dispatch(setAuth(dataFormat))
				// // Navigate to Home from Tab navigation
				if (res !== undefined) {
					navigation.navigate('TabNavHome')
				} else {
					setSnackText('Erreur Serveur !')
					setIsSnackVisible(true)
				}
			})
			// On Promise Reject
			.catch(async (err) => {
				await err
				err = err._W
				// Handling rejected Promise
				if (typeof err === 'object') {
					let { message } = err
					// Handling Validation error:
					if (err.status_code === 422) {
						err.errors.forEach((error) => {
							Object.keys(error).forEach((key) => {
								message += '\n-' + error[key]
							})
						})
						setSnackText(message)
					} else {
						// Handling Classic error:
						setSnackText(message)
					}
				} else {
					setSnackText(err)
				}

				setIsSnackVisible(true)
			})
	}

	// SnackBar states
	const [isSnackVisible, setIsSnackVisible] = useState(false)
	const [snackText, setSnackText] = useState('')

	return (
		<View style={styles.container}>
			<View>
				<Text style={{ fontSize: 30, marginTop: 10 }}>
					Ajouter une propriété:
				</Text>
				<ProgressBar
					progress={progress}
					color={Colors.blue800}
					style={{ width: 300 }}
				/>
			</View>

			{/* Page 1: Infos Principales */}
			<View style={{ display: visiblePage === 1 ? 'flex' : 'none' }}>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos Principales:
				</Text>
				{/* Title Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Intitulé de la propriété requis.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Intitulé"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.title}
								style={{ width: 300 }}
							/>
						)}
						name="title"
					/>
					{/* Title Form show-error part */}
					{errors?.title && (
						<Text style={{ color: 'red' }}>
							{errors.title.message}
						</Text>
					)}
				</View>
				{/* PropertyType Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Type de propriété requis.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Type de propriété"
								value={value}
								onSelection={onChange}
								arrayList={[...propertyTypes.list]}
								selectedArrayList={propertyTypes.selectedList}
								errorText={propertyTypes.error}
								multiEnable={false}
								checkboxLabelStyle={{
									color: 'black',
									fontWeight: '700',
								}}
							/>
						)}
						name="propertyType"
					/>
					{/* PropertyType Form show-error part */}
					{errors?.propertyType && (
						<Text style={{ color: 'red' }}>
							{errors.propertyType.message}
						</Text>
					)}
				</View>
				{/* Description Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Description"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.description}
								style={{ width: 300, height: 150 }}
							/>
						)}
						name="description"
					/>
					{/* Description Form show-error part */}
					{errors?.description && (
						<Text style={{ color: 'red' }}>
							{errors.description.message}
						</Text>
					)}
				</View>
			</View>

			{/* Page 2: Infos Géographiques */}
			<View style={{ display: visiblePage === 2 ? 'flex' : 'none' }}>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos Géographiques:
				</Text>
				{/* Location Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Adresse requise.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Adresse"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.location}
								style={{ width: 300 }}
							/>
						)}
						name="location"
					/>
					{/* Location Form show-error part */}
					{errors?.location && (
						<Text style={{ color: 'red' }}>
							{errors.location.message}
						</Text>
					)}
				</View>
				{/* PostalCode Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Code Postal requis.',
							},
							pattern: {
								value: REGID.value,
								message: REGID.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Code Postal"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.postalCode}
								style={{ width: 300 }}
							/>
						)}
						name="postalCode"
					/>
					{/* PostalCode Form show-error part */}
					{errors?.postalCode && (
						<Text style={{ color: 'red' }}>
							{errors.postalCode.message}
						</Text>
					)}
				</View>
				{/* City Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Ville requise.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Ville"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.city}
								style={{ width: 300 }}
							/>
						)}
						name="city"
					/>
					{/* City Form show-error part */}
					{errors?.city && (
						<Text style={{ color: 'red' }}>
							{errors.city.message}
						</Text>
					)}
				</View>
				{/* Country Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Pays requis.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Pays"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.country}
								style={{ width: 300 }}
							/>
						)}
						name="country"
					/>
					{/* Country Form show-error part */}
					{errors?.country && (
						<Text style={{ color: 'red' }}>
							{errors.country.message}
						</Text>
					)}
				</View>
			</View>

			{/* Page 3: Infos Principales 2 */}
			<View style={{ display: visiblePage === 3 ? 'flex' : 'none' }}>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos Principales 2:
				</Text>
				{/* Surface Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Surface requise.',
							},
							pattern: {
								value: REGNUM.value,
								message: REGNUM.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Surface"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.surface}
								style={{ width: 300 }}
							/>
						)}
						name="surface"
					/>
					{/* Surface Form show-error part */}
					{errors?.surface && (
						<Text style={{ color: 'red' }}>
							{errors.surface.message}
						</Text>
					)}
				</View>
				{/* RoomNumber Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Nombre de chambres requis.',
							},
							pattern: {
								value: REGNUM.value,
								message: REGNUM.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Nombre de chambres"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.roomNumber}
								style={{ width: 300 }}
							/>
						)}
						name="roomNumber"
					/>
					{/* RoomNumber Form show-error part */}
					{errors?.roomNumber && (
						<Text style={{ color: 'red' }}>
							{errors.roomNumber.message}
						</Text>
					)}
				</View>
				{/* ElectricMeterRef Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Référence compteur électrique"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.electricMeterRef}
								style={{ width: 300 }}
							/>
						)}
						name="electricMeterRef"
					/>
					{/* ElectricMeterRef Form show-error part */}
					{errors?.electricMeterRef && (
						<Text style={{ color: 'red' }}>
							{errors.electricMeterRef.message}
						</Text>
					)}
				</View>
				{/* GasMeterRef Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Référence compteur de gaz"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.gasMeterRef}
								style={{ width: 300 }}
							/>
						)}
						name="gasMeterRef"
					/>
					{/* GasMeterRef Form show-error part */}
					{errors?.gasMeterRef && (
						<Text style={{ color: 'red' }}>
							{errors.gasMeterRef.message}
						</Text>
					)}
				</View>
			</View>

			{/* Page 4: Infos techniques */}
			<View
				style={{
					display: visiblePage === 4 ? 'flex' : 'none',
					width: 300,
				}}
			>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos techniques:
				</Text>
				{/* List_Equipments Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						// rules={{
						// 	pattern: {
						// 		value: REGNUM.value,
						// 		message: REGNUM.message,
						// 	},
						// }}
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Liste équipements"
								value={stuffs.value}
								onSelection={onChange}
								arrayList={[...stuffs.list]}
								selectedArrayList={stuffs.selectedList}
								errorText={stuffs.error}
								multiEnable={true}
								// textInputMode="flat"
								// searchStyle={{
								// 	iconColor: 'red',
								// }}
							/>
						)}
						name="list_equipments"
					/>
					{/* List_Equipments Form show-error part */}
					{errors?.list_equipments && (
						<Text style={{ color: 'red' }}>
							{errors.list_equipments.message}
						</Text>
					)}
				</View>
				{/* HeatingType Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGID.value,
								message: REGID.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Type de chauffage"
								value={value}
								onSelection={onChange}
								arrayList={[...heatingTypes.list]}
								selectedArrayList={heatingTypes.selectedList}
								errorText={heatingTypes.error}
								multiEnable={false}
								checkboxLabelStyle={{
									color: 'black',
									fontWeight: '700',
								}}
							/>
						)}
						name="heatingType"
					/>
					{/* HeatingType Form show-error part */}
					{errors?.heatingType && (
						<Text style={{ color: 'red' }}>
							{errors.heatingType.message}
						</Text>
					)}
				</View>
				{/* HotWaterType Form part */}
				<View style={{ marginVertical: 20 }}>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGID.value,
								message: REGID.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Type de chauffage d'eau chaude"
								value={value}
								onSelection={onChange}
								arrayList={[...hotWaterTypes.list]}
								selectedArrayList={hotWaterTypes.selectedList}
								errorText={hotWaterTypes.error}
								multiEnable={false}
								checkboxLabelStyle={{
									color: 'black',
									fontWeight: '700',
								}}
							/>
						)}
						name="hotWaterType"
					/>
					{/* HotWaterType Form show-error part */}
					{errors?.hotWaterType && (
						<Text style={{ color: 'red' }}>
							{errors.hotWaterType.message}
						</Text>
					)}
				</View>
			</View>

			{/* Page 5: Infos financières */}
			<View
				style={{
					display: visiblePage === 5 ? 'flex' : 'none',
					width: 300,
				}}
			>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos financières:
				</Text>
				<View>
					{/* TransactionType Form part */}
					<View
						style={{
							marginVertical: 20,
						}}
					>
						<Controller
							style={{ alignItems: 'center' }}
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Type de transaction requis.',
								},
								pattern: {
									value: REGSTRING.value,
									message: REGSTRING.message,
								},
							}}
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<PaperSelect
									label="Type de transaction"
									value={value}
									onSelection={onChange}
									arrayList={[...transactionTypes.list]}
									selectedArrayList={
										transactionTypes.selectedList
									}
									errorText={transactionTypes.error}
									multiEnable={false}
									checkboxLabelStyle={{
										color: 'black',
										fontWeight: '700',
									}}
								/>
							)}
							name="transactionType"
						/>
						{/* TransactionType Form show-error part */}
						{errors?.transactionType && (
							<Text style={{ color: 'red' }}>
								{errors.transactionType.message}
							</Text>
						)}
					</View>
					{/* Amount Form part */}
					<View style={{ marginVertical: 20, alignItems: 'center' }}>
						<Controller
							control={control}
							rules={{
								required: {
									value: true,
									message: 'Montant requis.',
								},
								pattern: {
									value: REGNUM.value,
									message: REGNUM.message,
								},
							}}
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<TextInput
									mode="outlined"
									label="Montant"
									keyboardType="numeric"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									error={errors?.description}
									style={{ width: 300 }}
								/>
							)}
							name="amount"
						/>
						{/* Amount Form show-error part */}
						{errors?.amount && (
							<Text style={{ color: 'red' }}>
								{errors.amount.message}
							</Text>
						)}
					</View>
				</View>
				{/* IsToSell Form part */}
				<View style={{ marginVertical: 20 }}>
					<Text>
						Cette propriété est à vendre/louer dès maintenant:
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text>Non</Text>
						<Controller
							control={control}
							rules={{
								pattern: {
									value: REGID.value,
									message: REGID.message,
								},
							}}
							render={({
								field: { onChange, onBlur, value = true },
							}) => (
								<Switch
									value={value}
									onValueChange={onChange}
								/>
							)}
							name="isToSell"
						/>
						<Text>Oui</Text>
					</View>
					{/* IsToSell Form show-error part */}
					{errors?.isToSell && (
						<Text style={{ color: 'red' }}>
							{errors.isToSell.message}
						</Text>
					)}
				</View>
				<CustomButton
					style={{ marginBottom: 20 }}
					text="Valider"
					CustomIcon={(size, color) => (
						<Icon size={size} name="arrow-right" color={color} />
					)}
					onPress={handleSubmit(onSubmit)}
					reversed
				/>
			</View>

			{/* Page 6: Infos Vendeur */}
			{/* <View>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Infos Vendeur:
				</Text> */}
			{/* Submit Button */}
			{/* <CustomButton
					style={{ marginBottom: 20 }}
					text="Ajouter"
					CustomIcon={(size, color) => (
						<Icon size={size} name="arrow-right" color={color} />
					)}
					onPress={handleSubmit(onSubmit)}
					reversed
					// disabled={errors.email || errors.password ? true : false}
				/>
			</View> */}

			{/* Page 6: Récapitulatif */}
			<ScrollView
				style={{
					display: visiblePage === 6 ? 'flex' : 'none',
					width: Dimensions.get('screen').width,
				}}
			>
				<Text style={{ fontSize: 25, textAlign: 'center' }}>
					Récapitulatif:
				</Text>
				<View>{displaySummaryDataTable(datasToValidate)}</View>
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

			<View style={{ flexDirection: 'row', marginVertical: 10 }}>
				{visiblePage > 1 && visiblePage !== 6 && (
					<Button
						icon="arrow-left"
						mode="contained"
						compact
						labelStyle={{ fontSize: 12 }}
						onPress={() => handleNavigation('previous')}
						style={{ marginHorizontal: 10 }}
					>
						Précedent
					</Button>
				)}
				{visiblePage < 5 && (
					<Button
						icon="arrow-right"
						mode="contained"
						compact
						labelStyle={{ fontSize: 12 }}
						onPress={() => handleNavigation('next')}
						style={{ marginHorizontal: 10 }}
						reversed
					>
						Suivant
					</Button>
				)}
			</View>

			{/* SnackBar */}
			<CustomSnackBar
				visible={isSnackVisible}
				setVisible={setIsSnackVisible}
				type="error"
				title="Erreur"
				text={snackText}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		width: 250,
		height: 100,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
	},
})
