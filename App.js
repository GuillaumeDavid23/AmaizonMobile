// React imports
import * as React from 'react'
import { StatusBar } from 'expo-status-bar'

// Theme imports
import { theme } from './themes'
import { Provider as ThemeProvider } from 'react-native-paper'

// Route imports
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

// Redux imports
import { store } from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

// Stack Screen imports
import { LoginStackNav } from './navigation/stackNavigation'

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
