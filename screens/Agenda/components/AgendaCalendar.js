import { Agenda, LocaleConfig } from 'react-native-calendars'
import AgendaItem from './AgendaItem'

const AgendaCalendar = ({
	items,
	markedDates,
	handleDeleteAppointment,
	rowHasChanged,
	navigation,
}) => {
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
				return (
					<AgendaItem
						item={item}
						firstItemInDay={firstItemInDay}
						handleDeleteAppointment={handleDeleteAppointment}
						navigation={navigation}
					/>
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
			// When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
			showClosingKnob={true}
			// Specify your item comparison function for increased performance
			// rowHasChanged={(r1, r2) => {
			// 	return true
			// 	// return r1.text !== r2.text
			// }}
			rowHasChanged={rowHasChanged}
			// Agenda theme
			theme={{
				// ...calendarTheme,
				agendaDayTextColor: '#647F94',
				agendaDayNumColor: '#647F94',
				// agendaTodayColor: 'red',
				agendaKnobColor: '#647F94',
			}}
		/>
	)
}

export default AgendaCalendar
