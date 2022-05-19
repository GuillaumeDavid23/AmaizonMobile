// React imports
import React from 'react'

// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import PropertyScreen from '../../../screens/PropertyScreen'
import ListProperty from '../../../screens/ListProperty/ListPropertyScreen'
import InventoryScreen from '../../../screens/Inventory/Inventory'

// Creating Stack Navigator
const Stack = createStackNavigator()

const PropertyStackNav = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="PropertyHome" component={PropertyScreen} />

			<Stack.Screen name="PropertyList" component={ListProperty} />
			<Stack.Screen name="Inventory" component={InventoryScreen} />
		</Stack.Navigator>
	)
}

export default PropertyStackNav
