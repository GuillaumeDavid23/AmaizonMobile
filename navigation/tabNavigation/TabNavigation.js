// React imports
import React from 'react'

// Design imports
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Screen imports
import HomeScreen from '../../screens/HomeScreen'
import PropertyScreen from '../../screens/PropertyScreen'

// NavigationScreen imports
import { ContactStackNav } from '../stackNavigation/ContactStackNav'

// Hook imports
import { useTheme } from 'react-native-paper'
import { PropertyStackNav } from '../stackNavigation/PropertyStackNav'

// Create Bottom Tab Navigator
const Tab = createMaterialBottomTabNavigator()

const TabNavigation = () => {
	// Retrieve theme
	const theme = useTheme()

	return (
		<Tab.Navigator
			labeled={true} // Removing screen name below icons
		>
			{/* Home Screen */}
			<Tab.Screen
				name="Accueil"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Icon
							name="home"
							size={30}
							color={color}
							style={{ width: 30, height: 30 }}
						/>
					),
				}}
			/>
			{/* Inventory Screen */}
			<Tab.Screen
				name="Propriétés"
				component={PropertyStackNav}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Icon
							name="domain"
							size={30}
							color={color}
							style={{ width: 30, height: 30 }}
						/>
					),
				}}
			/>
			{/* Contact Stack Screen */}
			<Tab.Screen
				name="Clients"
				component={ContactStackNav}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Icon
							name="card-account-details"
							size={30}
							color={color}
							style={{ width: 30, height: 30 }}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	)
}

export default TabNavigation
