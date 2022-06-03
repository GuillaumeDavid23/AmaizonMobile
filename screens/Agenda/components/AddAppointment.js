import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import CustomSnackBar from '../../../components/CustomSnackBar'
import {
	createAppointment,
	updateAppointment,
	getOneAppointment,
} from '../../../services/Appointment'
import { getClient } from '../../../services/Contact'

// Pages imports
import AddAppointmentPage1 from './AddAppointmentPage1'
import AddAppointmentPage2 from './AddAppointmentPage2'

const AddAppointment = ({ navigation, route }) => {
	// Récupération du token:
	const token = useSelector((state) => state.user.auth.token)

	// SnackBar states
	const [isSnackVisible, setIsSnackVisible] = useState(false)
	const [snackText, setSnackText] = useState('')

	// Gestion de la pagination:
	const [visiblePage, setVisiblePage] = useState(1)

	// useEffect(() => {
	// 	console.log(1)
	// }, [startTimeSlots])

	// Déclaration des states hors React-hook-form:
	const [outdoor, setOutdoor] = useState(false)
	const [buyerSelected, setBuyerSelected] = useState()
	const [propertySelected, setPropertySelected] = useState()

	// Recherche du Buyer:
	const [searchBuyer, setSearchBuyer] = useState('')

	// Destructuring HookForm hook:
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		// defaultValues: {},
	})

	// En cas d'update, récupération du rendez-vous concerné:
	useEffect(() => {
		if (route.params !== undefined) {
			// Récupération du rendez-vous:
			getOneAppointment(route.params._id, token)
				.then((res) => {
					let { dateBegin, dateEnd, outdoor, address, id_property } =
						res.appointment
					// Insertion des valeurs dans les champs:
					setValue('date', dateBegin.substring(0, 10))
					setValue('startTime', dateBegin.substring(11, 16))
					setValue('endTime', dateEnd.substring(11, 16))
					setOutdoor(outdoor)
					setValue('address', address)
					setPropertySelected(id_property)

					// Récupération de l'utilisateur:
					getClient(res.appointment.id_buyer, token)
						.then((res2) => {
							setSearchBuyer(res2.data.lastname)
							setBuyerSelected(res2.data._id)
						})
						.catch((err) => {
							console.log(err)
						})
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}, [route.params])

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
		if (route.params === undefined) {
			createAppointment(dataToSend, token)
				.then((res) => {
					if (res !== undefined && res.status_code === 201) {
						navigation.navigate('Agenda')
					} else {
						setSnackText(
							"Erreur, veuillez contacter l'administrateur"
						)
						setIsSnackVisible(true)
					}
				})
				.catch(async (err) => {
					await err
					console.log(err)
					setSnackText("Erreur, veuillez contacter l'administrateur")
					setIsSnackVisible(true)
				})
		} else {
			updateAppointment(route.params._id, dataToSend, token)
				.then((res) => {
					if (res !== undefined && res.status_code === 200) {
						navigation.navigate('Agenda')
					} else {
						setSnackText(
							"Erreur, veuillez contacter l'administrateur"
						)
						setIsSnackVisible(true)
					}
				})
				.catch(async (err) => {
					await err
					console.log(err)
					setSnackText("Erreur, veuillez contacter l'administrateur")
					setIsSnackVisible(true)
				})
		}
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
				searchBuyer={searchBuyer}
				setSearchBuyer={setSearchBuyer}
				setBuyerSelected={setBuyerSelected}
				propertySelected={propertySelected}
				setPropertySelected={setPropertySelected}
				route={route}
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
