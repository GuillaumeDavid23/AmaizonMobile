// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import ContactScreen from '../../../screens/Contact/ContactScreen'
import SingleContactScreen from '../../../screens/SingleContact/SingleContactScreen'
import ClientSearch from '../../../screens/ClientSearch/ClientSearch'
import CreateContactScreen from '../../../screens/createContact/createContactScreen'

// Creating Stack Navigator
const Stack = createStackNavigator()

const ContactStackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="ContactHome" component={ContactScreen} />
			<Stack.Screen
				name="SingleContact"
				component={SingleContactScreen}
			/>
			<Stack.Screen name="ClientSearch" component={ClientSearch} />
			<Stack.Screen name="CreateClient" component={CreateContactScreen} />
		</Stack.Navigator>
	)
}

export default ContactStackNav
