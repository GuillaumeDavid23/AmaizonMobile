// React imports
import React from 'react'
import PropTypes from 'prop-types'

// Design imports
import { Snackbar, useTheme } from 'react-native-paper'

const CustomSnackBar = (props) => {
	// Destructuring props
	const { title, text, visible, setVisible, type } = props
	// Retrieve theme
	const theme = useTheme()

	return (
		<Snackbar
			visible={visible}
			onDismiss={() => setVisible(false)}
			style={{
				backgroundColor: theme.colors[type] || theme.colors.info,
			}}
		>{`${title}${text ? ` - ${text}` : ''}`}</Snackbar>
	)
}

// Setting prop types
CustomSnackBar.propTypes = {
	title: PropTypes.string,
	text: PropTypes.string,
	visible: PropTypes.bool,
	setVisible: PropTypes.func,
	type: PropTypes.string,
}

// Setting default props
CustomSnackBar.defaultProps = {
	title: '',
	text: '',
	visible: false,
	setVisible: (value) => {
		return
	},
	type: 'info',
}

export default CustomSnackBar
