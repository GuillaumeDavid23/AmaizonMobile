// Navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// Screen imports
import PropertyScreen from '../../../screens/PropertyScreen'
import ListProperty from '../../../screens/ListProperty/ListPropertyScreen'
import InventoryScreen from '../../../screens/Inventory/Inventory'
import AddProperty from '../../../screens/AddProperty/AddProperty'
import ListInventory from '../../../screens/ListInventory/ListInventoryScreen'

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

			<Stack.Screen name="AddProperty" component={AddProperty} />
			<Stack.Screen name="PropertyList" component={ListProperty} />
			<Stack.Screen name="Inventory" component={InventoryScreen} />
			<Stack.Screen name="InventoryList" component={ListInventory} />
		</Stack.Navigator>
	)
}

export default PropertyStackNav
