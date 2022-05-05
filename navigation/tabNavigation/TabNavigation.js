// React imports
import React from "react";

// Design imports
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Screen imports
import HomeScreen from "../../screens/HomeScreen";
import InventoryScreen from "../../screens/InventoryScreen";

// NavigationScreen imports
import { ContactStackNav } from "../stackNavigation/ContactStackNav";

// Hook imports
import { useTheme } from "react-native-paper";

// Create Bottom Tab Navigator
const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    // Retrieve theme
    const theme = useTheme();

    return (
        <Tab.Navigator
            labeled={false} // Removing screen name below icons
        >
            {/* Home Screen */}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="home" size={30} color={color} />
                    ),
                }}
            />
            {/* Inventory Screen */}
            <Tab.Screen
                name="Inventory"
                component={InventoryScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="domain" size={30} color={color} />
                    ),
                }}
            />
            {/* Contact Stack Screen */}
            <Tab.Screen
                name="Contact"
                component={ContactStackNav}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon
                            name="card-account-details"
                            size={30}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
