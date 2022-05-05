// React imports
import * as React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar'

// Theme imports
import { theme } from './themes'
import { Provider as ThemeProvider } from 'react-native-paper'

// Route imports
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import 'react-native-gesture-handler'

// Redux imports
import { store } from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

// Stack Screen imports
import { LoginStackNav } from './navigation/stackNavigation'

// Creating Stack Navigator
const Stack = createStackNavigator()

export default function App() {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider theme={theme}>
				<StatusBar style="auto" hidden />
				<NavigationContainer theme={theme}>
					<LoginStackNav />
				</NavigationContainer>
			</ThemeProvider>
		</ReduxProvider>
	)
}
