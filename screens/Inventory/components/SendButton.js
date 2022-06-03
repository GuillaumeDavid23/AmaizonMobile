// Import react element
import * as React from 'react'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'

//Import customs elements
import CustomButton from '../../../components/CustomButtonIcon'

const SendButton = (props) => {
	const theme = useTheme()
	const { handleSubmit, onSubmit } = props

	return (
		<CustomButton
			CustomIcon={(size, color) => (
				<Icon size={20} name="arrow-right" color={color} />
			)}
			text="Valider les changements"
			reversed={true}
			style={{
				justifyContent: 'center',
				height: 40,
				width: '80%',
				alignSelf: 'center',
				marginTop: 20,
				backgroundColor: theme.colors.success,
			}}
			labelStyle={{ fontSize: 12 }}
			onPress={handleSubmit(onSubmit)}
		/>
	)
}

export default SendButton
