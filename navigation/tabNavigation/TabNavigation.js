// React imports
import React from "react";

// Design imports
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Screen imports
import HomeScreen from "../../screens/HomeScreen";
import ContactScreen from "../../screens/ContactScreen";

// Hook imports
import { useTheme } from "react-native-paper";

// Create Bottom Tab Navigator
const Tab = createMaterialBottomTabNavigator();

const TabNavigation = () => {
    // Retrieve theme
    const theme = useTheme();

    return (
        <Tab.Navigator
            // Tab background color
            barStyle={{ backgroundColor: theme.colors.primary }}
            labeled={false} // Removing screen name below icons
        >
            {/* Home Screen */}
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            {/* Contact Screen */}
            <Tab.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Icon name="account" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
