// React imports
import React from 'react'

// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import InventoryScreen from '../../../screens/InventoryScreen'
import ListProperty from '../../../screens/ListProperty/ListPropertyScreen'

// Creating Stack Navigator
const Stack = createStackNavigator()

const PropertyStackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="PropertyHome" component={InventoryScreen} />
			
			<Stack.Screen name="PropertyList" component={ListProperty} />
		</Stack.Navigator>
	)
}

export default PropertyStackNav
