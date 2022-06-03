import { useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import CustomSnackBar from '../../../components/CustomSnackBar'
import { createAppointment } from '../../../services/Appointment'

// Pages imports
import AddAppointmentPage1 from './AddAppointmentPage1'
import AddAppointmentPage2 from './AddAppointmentPage2'

const AddAppointment = ({ navigation }) => {
	// Récupération du token:
	const token = useSelector((state) => state.user.auth.token)

	// SnackBar states
	const [isSnackVisible, setIsSnackVisible] = useState(false)
	const [snackText, setSnackText] = useState('')

	// Gestion de la pagination:
	const [visiblePage, setVisiblePage] = useState(1)
	const handleNavigation = (previousOrNext) => {
		// let newVisiblePage = visiblePage
		// if (previousOrNext === 'previous') {
		// 	newVisiblePage--
		// } else if (previousOrNext === 'next') {
		// 	// On check si des erreurs on été générés sur la page actuelle et dans ce cas, on bloque l'accès à la page suivante.
		// 	if (
		// 		(visiblePage === 1 &&
		// 			!(
		// 				errors.title ||
		// 				errors.propertyType ||
		// 				errors.description
		// 			)) ||
		// 		(visiblePage === 2 &&
		// 			!(
		// 				errors.location ||
		// 				errors.postalCode ||
		// 				errors.city ||
		// 				errors.country
		// 			))
		// 	) {
		// 		newVisiblePage++
		// 	}
		// }
		// setVisiblePage(newVisiblePage)
	}

	// Déclaration des states hors React-hook-form:
	const [outdoor, setOutdoor] = useState(false)
	const [buyerSelected, setBuyerSelected] = useState()
	const [propertySelected, setPropertySelected] = useState()

	// Destructuring HookForm hook:
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		// defaultValues: {},
	})

	// Envoi du formulaire:
	const onSubmit = (data) => {
		let dataToSend = {}

		// Formattage des dates:
		let startTime = data.startTime.text
		let endTime = data.endTime.text
		dataToSend['dateBegin'] = `${data.date} ${startTime}:00`
		dataToSend['dateEnd'] = `${data.date} ${endTime}:00`

		// Gestion de l'adresse:
		dataToSend['address'] = outdoor ? data.address : 'En agence'
		dataToSend['outdoor'] = outdoor

		// Récupération du vendeur et de la propriété:
		dataToSend['id_buyer'] = buyerSelected
		if (propertySelected) {
			dataToSend['id_property'] = propertySelected
		}

		// Execution de la requête:
		createAppointment(dataToSend, token)
			.then((res) => {
				if (res !== undefined && res.status_code === 201) {
					navigation.navigate('Agenda')
				} else {
					setSnackText("Erreur, veuillez contacter l'administrateur")
					setIsSnackVisible(true)
				}
			})
			.catch((err) => {
				console.log(err)
				setSnackText("Erreur, veuillez contacter l'administrateur")
				setIsSnackVisible(true)
			})
	}

	return (
		<View
			style={{
				justifyContent: 'center',
				flex: 1,
				marginTop: 50,
				marginVertical: 30,
				marginHorizontal: 25,
			}}
		>
			<View style={{ alignItems: 'center' }}>
				<Text style={{ fontSize: 30, marginVertical: 20 }}>
					Ajouter un rendez-vous:
				</Text>
				{/* <ProgressBar
					progress={progress}
					color={Colors.blue800}
					style={{ width: 300 }}
				/> */}
			</View>

			{/* Page 1 */}
			<AddAppointmentPage1
				display={visiblePage === 1 ? 'flex' : 'none'}
				control={control}
				errors={errors}
				outdoor={outdoor}
				setOutdoor={setOutdoor}
				setVisiblePage={setVisiblePage}
			/>

			{/* Page 2 */}
			<AddAppointmentPage2
				display={visiblePage === 2 ? 'flex' : 'none'}
				setVisiblePage={setVisiblePage}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				token={token}
				buyerSelected={buyerSelected}
				setBuyerSelected={setBuyerSelected}
				propertySelected={propertySelected}
				setPropertySelected={setPropertySelected}
			/>

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

export default AddAppointment
