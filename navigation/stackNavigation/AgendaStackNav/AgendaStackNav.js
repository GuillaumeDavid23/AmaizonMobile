// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import Agenda from '../../../screens/Agenda/Agenda'
import AddAppointment from '../../../screens/Agenda/components/AddAppointment'

// Creating Stack Navigator
const Stack = createStackNavigator()

const AgendaStackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Agenda" component={Agenda} />
			<Stack.Screen name="AddAppointment" component={AddAppointment} />
		</Stack.Navigator>
	)
}

export default AgendaStackNav
