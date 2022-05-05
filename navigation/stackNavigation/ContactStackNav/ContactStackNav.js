// React imports
import React from "react";

// Navigation imports
import { createStackNavigator } from "@react-navigation/stack";

// Screen imports
import ContactScreen from "../../../screens/ContactScreen";
import SingleContactScreen from "../../../screens/SingleContactScreen";
import ClientSearch from "../../../screens/ClientSearch";

// Creating Stack Navigator
const Stack = createStackNavigator();

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
			<Stack.Screen
				name="ClientSearch"
				component={ClientSearch}
			/>
		</Stack.Navigator>
	)
};

export default ContactStackNav;
