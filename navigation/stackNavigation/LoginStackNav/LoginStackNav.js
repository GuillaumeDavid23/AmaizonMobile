// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import LoginScreen from '../../../screens/LoginScreen'
import TabNavigation from '../../tabNavigation/TabNavigation'

// Creating Stack Navigator
const Stack = createStackNavigator()

const LoginStackNav = () => {
	return (
		<Stack.Navigator
			// Remove headers from stacks
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="TabNavHome" component={TabNavigation} />
		</Stack.Navigator>
	)
}

export default LoginStackNav
