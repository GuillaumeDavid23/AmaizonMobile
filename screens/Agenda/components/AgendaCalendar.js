import { Agenda, LocaleConfig } from 'react-native-calendars'
import { View, Text } from 'react-native'
import { FAB } from 'react-native-paper'

const AgendaCalendar = ({ items, markedDates, handleDeleteAppointment }) => {
	// Configuration du calendrier:
	LocaleConfig.locales['fr'] = {
		monthNames: [
			'Janvier',
			'Février',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juillet',
			'Août',
			'Septembre',
			'Octobre',
			'Novembre',
			'Décembre',
		],
		monthNamesShort: [
			'Janv.',
			'Févr.',
			'Mars',
			'Avril',
			'Mai',
			'Juin',
			'Juil.',
			'Août',
			'Sept.',
			'Oct.',
			'Nov.',
			'Déc.',
		],
		dayNames: [
			'Dimanche',
			'Lundi',
			'Mardi',
			'Mercredi',
			'Jeudi',
			'Vendredi',
			'Samedi',
		],
		dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
		today: "Aujourd'hui",
	}
	LocaleConfig.defaultLocale = 'fr'

	return (
		<Agenda
			// The list of items that have to be displayed in agenda. If you want to render item as empty date
			// the value of date key has to be an empty array []. If there exists no value for date key it is
			// considered that the date in question is not yet loaded
			items={items}
			// Specify how each item should be rendered in agenda
			renderItem={(item, firstItemInDay) => {
				let { _id, startTime, endTime, buyer, address } = item
				return (
					<View
						style={{
							height: 100,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							// border: 'black solid 1px',
						}}
					>
						<View>
							<Text>
								{startTime}-{endTime} avec {buyer.lastname}{' '}
								{buyer.firstname}
							</Text>
							<Text>{address}</Text>
						</View>
						<View>
							<FAB
								style={{ margin: 10 }}
								small
								icon="delete"
								onPress={() => handleDeleteAppointment(_id)}
							/>
						</View>
					</View>
				)
			}}
			// // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
			// minDate={'now'}

			// Handler which gets executed when press arrow icon left. It receive a callback can go back month
			onPressArrowLeft={(subtractMonth) => subtractMonth()}
			// Handler which gets executed when press arrow icon right. It receive a callback can go next month
			onPressArrowRight={(addMonth) => addMonth()}
			// Enable the option to swipe between months. Default = false
			enableSwipeMonths={true}
			// Collection of dates that have to be marked. Default = {}
			markedDates={markedDates}
			// Max amount of months allowed to scroll to the past. Default = 50
			pastScrollRange={1}
			// Max amount of months allowed to scroll to the future. Default = 50
			futureScrollRange={3}
		/>
	)
}

export default AgendaCalendar
