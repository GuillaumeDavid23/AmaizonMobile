// React imports
import React from 'react'

// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import LoginScreen from '../../../screens/LoginScreen'
import TabNavigation from '../../tabNavigation/TabNavigation'
import AddProperty from '../../../screens/AddProperty/AddProperty'

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
			<Stack.Screen name="AddProperty" component={AddProperty} />
		</Stack.Navigator>
	)
}

export default LoginStackNav
