import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import AgendaCalendar from './components/AgendaCalendar'
import {
	getAllAppointments,
	deleteAppointment,
} from '../../services/Appointment'
import { useSelector } from 'react-redux'
import { View } from 'react-native'
import CustomButton from '../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'

const Agenda = ({ navigation }) => {
	// Récupération du token:
	const token = useSelector((state) => state.user.auth.token)

	// Récupération des rendez-vous avec reload:
	const isFocus = useIsFocused()
	const [items, setItems] = useState(null)
	const [markedDates, setMarkedDates] = useState({})
	useEffect(() => {
		if (isFocus) {
			try {
				getAllAppointments(token).then((res) => {
					let itemsToState = {}
					let markedDatesToState = {}
					for (let appointment of res.datas) {
						let date = appointment.dateBegin.substring(0, 10)
						let startTime = appointment.dateBegin.substring(11, 16)
						let endTime = appointment.dateEnd.substring(11, 16)
						let objectToPush = {
							_id: appointment._id,
							startTime,
							endTime,
							buyer: appointment.buyer,
							address: appointment.address,
						}
						if (itemsToState[date] === undefined) {
							itemsToState[date] = [objectToPush]
						} else {
							itemsToState[date].push(objectToPush)
						}
						markedDatesToState[date] = { marked: true }
					}
					setItems(itemsToState)
					setMarkedDates(markedDatesToState)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}, [isFocus])

	const rowHasChanged = (r1, r2) => {
		return r1.text !== r2.text
		// return true
	}

	// Suppression d'un rendez-vous:
	const handleDeleteAppointment = (appointmentId) => {
		deleteAppointment(token, appointmentId)
			.then((res) => {
				// On met à jour le tableau:
				let itemsToState = items
				for (let dateArray in itemsToState) {
					itemsToState[dateArray] = itemsToState[dateArray].filter(
						(item) => item._id !== parseInt(appointmentId)
					)
				}
				// On call la fonction rowHasChanged avant la mise à jour du state:
				rowHasChanged(items, itemsToState)

				setItems(itemsToState)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<View style={{ flex: 1, justifyContent: 'space-between' }}>
			<View style={{ height: 550, marginTop: 25 }}>
				<AgendaCalendar
					items={items}
					markedDates={markedDates}
					handleDeleteAppointment={(_id) =>
						handleDeleteAppointment(_id)
					}
					rowHasChanged={rowHasChanged}
					navigation={navigation}
				/>
			</View>
			<CustomButton
				style={{ marginBottom: 25, marginHorizontal: 25 }}
				text="Ajouter un rendez-vous"
				CustomIcon={(size, color) => (
					<Icon size={size} name="plus" color={color} />
				)}
				onPress={() => navigation.navigate('AddAppointment')}
			/>
		</View>
	)
}

export default Agenda
