import * as React from "react";
import { StatusBar } from "expo-status-bar";

//THEME
import { theme } from "./themes";
import { Provider as ThemeProvider, TextInput } from "react-native-paper";

//ROUTING IMPORT
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
const Stack = createStackNavigator();
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

//REDUX IMPORT 
import { store } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import ContactScreen from "./screens/ContactScreen";
import InventoryScreen from "./screens/InventoryScreen";

export default function App() {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <StatusBar style="auto" />
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
                            name="Inventory"
                            component={InventoryScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>
        </ReduxProvider>
    );
}
