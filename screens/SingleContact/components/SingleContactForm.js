// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { useForm, Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput } from 'react-native-paper'

//Import customs elements
import SwitchCustom from '../../../components/CustomSwitch'
import SendButton from './SendButton'

//Import fetch method
import { updateClient } from '../../../services/Contact'
import { setContact } from '../../../redux/userSlice'
import validate from '../../../utils/validation'
import { SingleContactStyle as styles } from '../styles/SingleContactStyles'

const SingleContactForm = (props) => {
	const [isEditable, setIsEditable] = React.useState(false)
	const { client, setClient, index, setSnackVisisble } = props
	const user = useSelector((state) => state.user.auth)
	const dispatch = useDispatch()
	const theme = useTheme()
	//Création du formulaire
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			firstname: client.firstname,
			lastname: client.lastname,
			email: client.email,
			phone: client.phone,
		},
		mode: 'onChange',
		shouldFocusError: true,
	})

	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		updateClient(client._id, user.token, data)
			.then((response) => {
				const infosClient = { ...data, _id: client._id }
				const sendData = {
					data: infosClient,
					index: index,
				}
				dispatch(setContact(sendData))
				setClient(data)
				setIsEditable(false)
				setSnackVisisble(true)
			})
			.catch((errors) => {
				console.log(errors)
			})
	}
	return (
		<View>
			{/* EDIT SWITCH START */}
			<SwitchCustom
				style={{ alignSelf: 'center', marginTop: 20 }}
				text="Modifier"
				handleSwitch={setIsEditable}
				isSwitchOn={isEditable}
			/>
			{/* EDIT SWITCH END */}

			{/* NAME INPUT START */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
				{/* LASTNAME INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.userName}
						name="lastname"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Nom"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="lastname"
								value={value}
								error={errors?.lastname}
								style={[
									{
										width: '80%',
										alignSelf: 'center',
									},
									!isEditable ? styles.dnone : null,
								]}
								disabled={!isEditable}
							/>
						)}
					/>
					{errors?.lastname && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.lastname.message}
						</Text>
					)}
				</View>
				{/* LASTNAME INPUT END */}

				{/* FIRSTNAME INPUT START */}
				<View style={{ width: '50%' }}>
					<Controller
						control={control}
						rules={validate.userName}
						name="firstname"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Prénom"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="firstname"
								value={value}
								error={errors?.firstname}
								style={[
									{
										width: '80%',
										alignSelf: 'center',
									},
									!isEditable ? styles.dnone : null,
								]}
								disabled={!isEditable}
							/>
						)}
					/>
					{errors?.firstname && (
						<Text
							style={{
								color: theme.colors.error,
								alignSelf: 'center',
							}}
						>
							{errors.firstname.message}
						</Text>
					)}
				</View>
				{/* FIRSTNAME INPUT END */}
			</View>
			{/* NAME INPUT START */}

			{/* EMAIL INPUT START */}
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.email}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Email"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="email"
							value={value}
							error={errors?.email}
							style={{ width: '90%' }}
							disabled={!isEditable}
						/>
					)}
					name="email"
				/>
				{errors?.email && (
					<Text style={{ color: theme.colors.error }}>
						{errors.email.message}
					</Text>
				)}
			</View>
			{/* EMAIL INPUT END */}

			{/* PHONE INPUT START */}
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.phone}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Téléphone"
							onBlur={onBlur}
							onChangeText={onChange}
							keyboardType="phone-pad"
							autoComplete="phone"
							value={value}
							error={errors?.phone}
							style={{ width: '90%' }}
							disabled={!isEditable}
						/>
					)}
					name="phone"
				/>
				{errors?.phone && (
					<Text style={{ color: theme.colors.error }}>
						{errors.phone.message}
					</Text>
				)}
			</View>
			{/* PHONE INPUT END */}
			{isEditable ? (
				<SendButton handleSubmit={handleSubmit} onSubmit={onSubmit} />
			) : null}
		</View>
	)
}

export default SingleContactForm
