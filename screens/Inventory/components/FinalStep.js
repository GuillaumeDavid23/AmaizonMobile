// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput, Button } from 'react-native-paper'

import validate from '../../../utils/validation'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const InventoryFormStep1 = (props) => {

	return (
		<View style={{ flex: 1, width: '100%', marginTop: 10 }}>
            
		</View>
	)
}

export default InventoryFormStep1
