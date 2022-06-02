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
import SendButton from './SendButton'

//Import fetch method
import { createClient } from '../../../services/Contact'
import { addContact } from '../../../redux/userSlice'
import validate from '../../../utils/validation'

const CreateContactForm = (props) => {
	const [isVisible, setIsVisible] = React.useState(false)
	const { client, setClient, navigation } = props
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
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			password: '',
		},
		mode: 'onChange',
		shouldFocusError: true,
	})

	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		const sendData = {
			...data,
			buyer: {
				agent: user.data._id,
			},
		}
		createClient(user.token, sendData).then((response) => {
			console.log(response)
			const contact = {
				_id: response.user._id,
				firstname: response.user.firstname,
				lastname: response.user.lastname,
				email: response.user.email,
				phone: response.user.phone,
			}
			dispatch(addContact(contact))
			navigation.navigate('ContactHome')
		})
	}
	return (
		<View>
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
								autoComplete="name-family"
								value={value}
								error={errors?.lastname}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
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
								autoComplete="name"
								value={value}
								error={errors?.firstname}
								style={{
									width: '80%',
									alignSelf: 'center',
								}}
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
							keyboardType="email-address"
							onChangeText={onChange}
							autoComplete="email"
							value={value}
							error={errors?.email}
							style={{ width: '90%' }}
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
							keyboardType="phone-pad"
							onChangeText={onChange}
							autoComplete="tel"
							value={value}
							error={errors?.phone}
							style={{ width: '90%' }}
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

			{/* PASSWORD INPUT START*/}
			<View
				style={{
					marginBottom: 30,
					marginTop: 20,
					alignItems: 'center',
				}}
			>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Champ mot de passe requis',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Mot de passe"
							secureTextEntry={!isVisible}
							onBlur={onBlur}
							autoComplete="password"
							onChangeText={onChange}
							value={value}
							error={errors?.password}
							style={{ width: '90%' }}
							right={
								<TextInput.Icon
									name={isVisible ? 'eye-off' : 'eye'}
									onPress={() => setIsVisible(!isVisible)}
								/>
							}
						/>
					)}
					name="password"
				/>
				{/* Password Form show-error part */}
				{errors?.password && (
					<Text style={{ color: 'red' }}>
						{errors.password.message}
					</Text>
				)}
			</View>
			{/* PASSWORD INPUT END */}

			<SendButton handleSubmit={handleSubmit} onSubmit={onSubmit} />
		</View>
	)
}

export default CreateContactForm
