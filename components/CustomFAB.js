import * as React from 'react'
import { StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
const CustomFAB = (props) => {
    const theme = useTheme()
	const { onPress } = props
    return(
	<FAB
		style={{...styles.fab, backgroundColor: theme.colors.success}}
		icon="plus"
		onPress={onPress}
	/>
)}

const styles = StyleSheet.create({
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 50,
	},
})

export default CustomFAB
