import { Button } from 'react-native-paper'
import { theme } from '../themes'

const CustomButton = (props) => {
	const { text, CustomIcon, onPress, reversed, disabled, style, labelStyle, loading } =
		props
	return (
		<Button
			loading={loading}
			theme={theme.CustomButtonRadius}
			icon={({ size, color }) => CustomIcon(size, color)}
			mode="contained"
			onPress={onPress}
			contentStyle={reversed ? { flexDirection: 'row-reverse' } : {}}
			style={[theme.CustomButtonRadius, style]}
			disabled={disabled ? true : false}
			labelStyle={labelStyle}
		>
			{text}
		</Button>
	)
}

export default CustomButton
