// React imports
import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Dosis from './assets/fonts/Dosis.ttf'
import DosisSemiBold from './assets/fonts/Dosis-SemiBold.ttf'
// Theme imports
import { theme } from './themes'
import { Provider as PaperProvider } from 'react-native-paper'

// Route imports
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler'

// Redux imports
import { store } from './redux/store'
import { Provider as ReduxProvider } from 'react-redux'

// Stack Screen imports
import { LoginStackNav } from './navigation/stackNavigation'
import moment from 'moment'
import { SafeAreaView } from 'react-native-safe-area-context'
moment.locale('fr')
export default function App() {
	const [appIsReady, setAppIsReady] = React.useState(false)

	React.useEffect(() => {
		async function prepare() {
			try {
				await SplashScreen.preventAutoHideAsync()
				await Font.loadAsync({
					Dosis,
					DosisSemiBold,
				})
			} catch (e) {
				console.warn(e)
			} finally {
				setAppIsReady(true)
			}
		}

		prepare()
	}, [])

	const onLayoutRootView = React.useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])
	
	React.useLayoutEffect(()=> {
		onLayoutRootView();
	})

	if (!appIsReady) {
		return null
	}
	
	return (
		<ReduxProvider store={store}>
			<PaperProvider theme={theme}>
					<StatusBar style="auto" />
					<NavigationContainer theme={theme}>
						<LoginStackNav />
					</NavigationContainer>
			</PaperProvider>
		</ReduxProvider>
	)
}
