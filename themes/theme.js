import { DefaultTheme } from 'react-native-paper'
import { DefaultTheme as ReactNavDefaultTheme } from '@react-navigation/native'

const theme = {
	...ReactNavDefaultTheme,
	...DefaultTheme,
	roundness: 5,
	colors: {
		...ReactNavDefaultTheme.colors,
		...DefaultTheme.colors,
		accent: '#DCD0C1',
		primary: '#647F94',
		success: '#388e3c',
		error: '#AE0000',
		info: '#0288d1',
		warning: '#f57c00',
	},

	CustomButtonRadius: {
		borderBottomLeftRadius: 20,
		borderTopRightRadius: 20,
		fontSize: 50,
		shadowColor: '#000',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.8,
		shadowRadius: 6,
		elevation: 7,
	},
}

export default theme
