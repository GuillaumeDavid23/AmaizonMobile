// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { useForm, Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput, RadioButton } from 'react-native-paper'

//Import customs elements
import SwitchCustom from '../../../components/CustomSwitch'
import SendButton from './SendButton'
import Icon from 'react-native-vector-icons/FontAwesome'


//Import fetch method
import { getClient, updateClient } from '../../../services/Contact'
import { setContact } from '../../../redux/userSlice'
import validate from '../../../utils/validation'

const ClientSearchForm = (props) => {
	const { clientId, index } = props
	const user = useSelector((state) => state.user.auth)
	const dispatch = useDispatch()
	const theme = useTheme()
	const [checkedType, setCheckedType] = React.useState('Achat')
	const [checkedProperty, setCheckedProperty] = React.useState('Maison')
	const [client, setClient] = React.useState({})

	React.useLayoutEffect(() => {
		getClient(clientId, user.token).then((response) => {
			const clientInfos = response.data
			setClient(clientInfos);
			setValue(
				'budgetMin',
				clientInfos.buyer.budgetMin
					? clientInfos.buyer.budgetMin.toString()
					: ''
			)
			setValue(
				'budgetMax',
				clientInfos.buyer.budgetMax
					? clientInfos.buyer.budgetMax.toString()
					: ''
			)
			setValue(
				'surfaceMin',
				clientInfos.buyer.surfaceMin
					? clientInfos.buyer.surfaceMin.toString()
					: ''
			)
			setValue(
				'surfaceMax',
				clientInfos.buyer.surfaceMax
					? clientInfos.buyer.surfaceMax.toString()
					: ''
			)
			setValue(
				'rooms',
				clientInfos.buyer.rooms
					? clientInfos.buyer.rooms.toString()
					: ''
			)
			setValue(
				'city',
				clientInfos.buyer.city ? clientInfos.buyer.city.toString() : ''
			)
			setValue(
				'type',
				clientInfos.buyer.type === 'Achat'
					? setCheckedType('Achat')
					: setCheckedType('Location')
			)
			setValue(
				'propertyType',
				clientInfos.buyer.propertyType === 'Maison'
					? setCheckedProperty('Maison')
					: setCheckedProperty('Appartement')
			)
		})
	}, [])
	//Création du formulaire
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			budgetMin: '',
			budgetMax: '',
			city: '',
			surfaceMin: '',
			surfaceMax: '',
			type: '',
			propertyType: '',
			rooms: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
	})

	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		const clientSend = {
			buyer: {
				...data,
				budgetMin: parseInt(data.budgetMin),
				budgetMax: parseInt(data.budgetMax),
				rooms: parseInt(data.rooms),
				surfaceMin: parseInt(data.surfaceMin),
				surfaceMax: parseInt(data.surfaceMax),
			},
		}
		updateClient(client._id, user.token, clientSend)
			.then((response) => {
				console.log(response);
				//MESSAGE DE VALIDATION A FAIRE
			})
			.catch((errors) => {
				console.log(errors)
			})
	}
	return (
		<View>
			{/* BUDGET INPUT START */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{/* BUDGET MIN INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.number}
						name="budgetMin"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Budget Min"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="budgetMin"
								value={value}
								error={errors?.budgetMin}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="euro"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.budgetMin && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.budgetMin.message}
						</Text>
					)}
				</View>
				{/* BUDGET MIN INPUT END */}

				{/* BUDGET MAX INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.number}
						name="budgetMax"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Budget Max"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="budgetMax"
								value={value}
								error={errors?.budgetMax}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="euro"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.budgetMax && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.budgetMax.message}
						</Text>
					)}
				</View>
				{/* BUDGET MAX INPUT END */}
			</View>
			{/* BUDGET INPUT START */}

			{/* CITY AND TYPE INPUT START */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{/* CITY INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.userName}
						name="city"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Ville"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="city"
								value={value}
								error={errors?.city}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="map-marker"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.city && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.city.message}
						</Text>
					)}
				</View>
				{/* CITY INPUT END */}

				{/* NOMBRE DE PIECES INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.number}
						name="rooms"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Nb pièces"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="rooms"
								value={value}
								error={errors?.rooms}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="cube"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.rooms && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.rooms.message}
						</Text>
					)}
				</View>
				{/* NOMBRE DE PIECE INPUT END */}
			</View>
			{/* CITY AND TYPE INPUT START */}

			{/* SURFACE INPUT START */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{/* SURFACE MIN INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.number}
						name="surfaceMin"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Surface Min"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="surfaceMin"
								value={value}
								error={errors?.surfaceMin}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="home"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.surfaceMin && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.surfaceMin.message}
						</Text>
					)}
				</View>
				{/* SURFACE MIN INPUT END */}

				{/* SURFACE MAX INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.number}
						name="surfaceMax"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Surface Max"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="surfaceMax"
								value={value}
								error={errors?.surfaceMax}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="home"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={() => {}}
									/>
								}
							/>
						)}
					/>
					{errors?.surfaceMax && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.surfaceMax.message}
						</Text>
					)}
				</View>
				{/* SURFACE MAX INPUT END */}
			</View>
			{/* SURFACE INPUT START */}

			{/* TYPEINPUT START */}
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				<Text>Type d'achat :</Text>
				<View
					style={{
						width: '50%',
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text>Achat</Text>
						<RadioButton
							value="Achat"
							status={
								checkedType === 'Achat'
									? 'checked'
									: 'unchecked'
							}
							onPress={() => {
								setCheckedType('Achat')
								setValue('type', 'Achat')
							}}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text>Location</Text>
						<RadioButton
							value="Location"
							status={
								checkedType === 'Location'
									? 'checked'
									: 'unchecked'
							}
							onPress={() => {
								setCheckedType('Location')
								setValue('type', 'Location')
							}}
						/>
					</View>
				</View>
				{errors?.type && (
					<Text
						style={{
							color: theme.colors.error,
							alignSelf: 'center',
						}}
					>
						{errors.type.message}
					</Text>
				)}
			</View>
			{/* TYPEINPUT END */}

			{/* PROPERTY TYPE START */}
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
			>
				<Text>Type de propriété : </Text>
				<View
					style={{
						width: '50%',
						flexDirection: 'row',
						justifyContent: 'center',
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text>Maison</Text>
						<RadioButton
							value="Maison"
							status={
								checkedProperty === 'Maison'
									? 'checked'
									: 'unchecked'
							}
							onPress={() => {
								setCheckedProperty('Maison')
								setValue('type', 'Maison')
							}}
						/>
					</View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<Text>Appartement</Text>
						<RadioButton
							value="Appartement"
							status={
								checkedProperty === 'Appartement'
									? 'checked'
									: 'unchecked'
							}
							onPress={() => {
								setCheckedProperty('Appartement')
								setValue('type', 'Appartement')
							}}
						/>
					</View>
				</View>
				{errors?.type && (
					<Text
						style={{
							color: theme.colors.error,
							alignSelf: 'center',
						}}
					>
						{errors.type.message}
					</Text>
				)}
			</View>
			{/* PROPERTY TYPE END */}
			<SendButton handleSubmit={handleSubmit} onSubmit={onSubmit} />
		</View>
	)
}

export default ClientSearchForm
