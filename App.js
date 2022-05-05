// React imports
import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";

// Theme imports
import { theme } from "./themes";
import { Provider as ThemeProvider } from "react-native-paper";

// Route imports
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// Redux imports
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";

// Screen imports
import LoginScreen from "./screens/LoginScreen";
import TabNavigation from "./navigation/tabNavigation/TabNavigation";

import InventoryScreen from "./screens/InventoryScreen";
import SingleContactScreen from "./screens/SingleContactScreen";
import ContactScreen from "./screens/ContactScreen";

// Creating Stack Navigator
const Stack = createStackNavigator();

export default function App() {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <StatusBar style="auto" hidden />
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen
                            name="Contact"
                            component={ContactScreen}
                        />
                        <Stack.Screen
                            name="SingleContact"
                            component={SingleContactScreen}
                        />
                        <Stack.Screen
                            name="Inventory"
                            component={InventoryScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </ReduxProvider>
    );
}
