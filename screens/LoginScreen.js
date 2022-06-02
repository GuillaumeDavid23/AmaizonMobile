// React imports
import * as React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Linking,
	Button,
	Alert,
	TouchableOpacity,
} from 'react-native'

// Design imports
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import Logo from '../assets/images/logoFull.png'
import CustomButton from '../components/CustomButtonIcon'
import CustomSnackBar from '../components/CustomSnackBar'
// Service imports
import doLogin from '../services/UserLogin'

// HookForm imports
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setAuth } from '../redux/userSlice'
export default function LoginScreen({ navigation }) {
	// Password state
	const [isVisible, setIsVisible] = React.useState(false)
	const dispatch = useDispatch()

	// SnackBar states
	const [isSnackVisible, setIsSnackVisible] = React.useState(false)
	const [snackText, setSnackText] = React.useState('')

	// Destructuring HookForm hook
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: process.env.AGENT_LOGIN ? process.env.AGENT_LOGIN : '',
			password: process.env.AGENT_PASS ? process.env.AGENT_PASS : '',
		},
		mode: 'onChange',
		shouldFocusError: true,
	})

	/**
	 * Submit function for HookForm submit
	 * @param {Object} data Form info
	 */
	const onSubmit = (data) => {
		doLogin(data.email, data.password)
			// On Promise Successful
			.then((data) => {
				// Formating datas
				const dataFormat = {
					token: data.token,
					isLoggedIn: true,
					data: data.data,
				}

				// Dispatching formatted data to redux store
				dispatch(setAuth(dataFormat))

				// Navigate to Home from Tab navigation
				navigation.navigate('TabNavHome')
			})
			// On Promise Reject
			.catch(async (err) => {
				if (typeof err === 'object') {
					// Handling rejected Promise
					const { message } = await err
					setSnackText(message)
				} else {
					setSnackText(err)
				}

				setIsSnackVisible(true)
			})
	}

	const forgotUrl = 'http://192.168.1.219:3000/forgetPass'

	const OpenURLButton = ({ url, children }) => {
		const handlePress = React.useCallback(async () => {
			// Checking if the link is supported for links with custom URL scheme.
			const supported = await Linking.canOpenURL(url)

			if (supported) {
				// Opening the link with some app, if the URL scheme is "http" the web link should be opened
				// by some browser in the mobile
				await Linking.openURL(url)
			} else {
				Alert.alert(`Nous ne pouvons pas ouvrir le lien: ${url}`)
			}
		}, [url])

		return (
			<TouchableOpacity onPress={handlePress}>
				<Text
					style={{
						textDecorationLine: 'underline',
						textAlign: 'center',
						fontSize: 18,
						marginTop: 20,
						fontFamily: 'Dosis'
					}}
				>
					{children}
				</Text>
			</TouchableOpacity>
		)
	}
	return (
		<View style={styles.container}>
			{/* Brand Logo */}
			<Image style={styles.logo} source={Logo} />

			{/* Email Form part */}
			<View style={{ marginTop: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Champ email requis',
						},
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
							message: 'Entrer une email valide',
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Email"
							keyboardType="email-address"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="email"
							value={value}
							error={errors?.email}
							style={{ width: 300 }}
						/>
					)}
					name="email"
				/>
				{/* Email Form show-error part */}
				{errors?.email && (
					<Text style={{ color: 'red' }}>{errors.email.message}</Text>
				)}
			</View>

			{/* Password Form part */}
			<View style={{ marginBottom: 30, marginTop: 20 }}>
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
							style={{ width: 300 }}
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
			{/* Submit Button */}
			<CustomButton
				text="Connexion"
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				onPress={handleSubmit(onSubmit)}
				reversed
				disabled={errors.email || errors.password ? true : false}
				style={{width: '80%'}}
			/>
			<OpenURLButton url={forgotUrl}>Mot de passe oublié ?</OpenURLButton>
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
		justifyContent: 'center',
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
