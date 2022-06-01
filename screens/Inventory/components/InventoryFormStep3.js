// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput, Button, Divider } from 'react-native-paper'

import validate from '../../../utils/validation'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const InventoryFormStep3 = (props) => {
	const { control, errors, setValue } = props
	const user = useSelector((state) => state.user.auth)

	const dispatch = useDispatch()
	const theme = useTheme()
	const [date, setDate] = React.useState(new Date())
	const [dateTimeShow, setDateTimeShow] = React.useState(false)

	return (
		<View style={{ flex: 1, width: '100%', marginTop: 10 }}>
			{/* lst_statsMeters INPUT START */}
			<View style={{ width: '100%' }}>
				<Controller
					control={control}
					rules={validate.alphaNumeric}
					name="lst_statsMeters"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence du compteur électrique"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.lst_statsMeters}
							style={{
								width: '90%',
								alignSelf: 'center',
							}}
							theme={{ colors: { error: '#f57c00' } }}
							right={
								<TextInput.Icon
									name="home-outline"
									color={theme.colors.primary}
								/>
							}
						/>
					)}
				/>
				{errors?.lst_statsMeters && (
					<Text
						style={{
							color: theme.colors.warning,
							alignSelf: 'center',
						}}
					>
						{errors.lst_statsMeters.message}
					</Text>
				)}
			</View>
			{/* ElectricStats INPUT END */}
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>

		</View>
	)
}

export default InventoryFormStep3
