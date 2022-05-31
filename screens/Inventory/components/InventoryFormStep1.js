// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { useForm, Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput, Button } from 'react-native-paper'
//Import customs elements
import SendButton from './SendButton'

//Import fetch method
import { createClient } from '../../../services/Contact'
import { addContact } from '../../../redux/userSlice'
import validate from '../../../utils/validation'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
const InventoryFormStep1 = (props) => {
	const { control, errors, setValue } = props
	const user = useSelector((state) => state.user.auth)
	const dispatch = useDispatch()
	const theme = useTheme()
	const [date, setDate] = React.useState(new Date())
	const [dateTimeShow, setDateTimeShow] = React.useState(false)

	return (
		<View style={{ flex: 1, width: '100%' }}>
			{/* PropertyRef INPUT START */}
			<View style={{ width: '100%' }}>
				<Controller
					control={control}
					rules={validate.userName}
					name="PropertyRef"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence du bien"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="lastname"
							value={value}
							error={errors?.PropertyRef}
							style={{
								width: '90%',
								alignSelf: 'center',
							}}
							theme={{ colors: { error: '#f57c00' } }}
						/>
					)}
				/>
				{errors?.PropertyRef && (
					<Text
						style={{
							color: theme.colors.warning,
							alignSelf: 'center',
						}}
					>
						{errors.PropertyRef.message}
					</Text>
				)}
			</View>
			{/* LASTNAME INPUT END */}

			{/* CLIENT REF INPUT START */}
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.userName}
					name="ClientRef"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence du client"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="ClientRef"
							value={value}
							error={errors?.ClientRef}
							style={{ width: '90%' }}
							theme={{ colors: { error: '#f57c00' } }}
						/>
					)}
				/>
				{errors?.ClientRef && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.ClientRef.message}
					</Text>
				)}
			</View>
			{/* CLIENT REF INPUT END */}

			{/* DATE INPUT START */}
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				<Controller
					control={control}
					name="dateStart"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Date de l'état des lieux"
							read
							onBlur={onBlur}
							onChangeText={onChange}
							value={moment(value).format('DD/MM/YYYY')}
							onPressIn={() => {
								setDateTimeShow(true)
							}}
							showSoftInputOnFocus={false}
							style={{ width: '90%' }}
							caretHidden={true}
							theme={{ colors: { error: '#f57c00' } }}
						/>
					)}
				/>
				{errors?.dateStart && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.dateStart.message}
					</Text>
				)}
				{dateTimeShow && (
					<DateTimePicker
						mode="date"
						value={new Date()}
						is24Hour={true}
						onChange={(event, date) => {
							setDateTimeShow(false)
							setValue(
								'dateStart',
								moment(date).format('YYYY-MM-DD')
							)
						}}
					/>
				)}
			</View>
			{/* DATE INPUT END */}

			{/* DATE INPUT START */}
			<View style={{ marginTop: 20, alignItems: 'center' }}>
				<Controller
					control={control}
					name="inOut"
					render={({ field: { onChange, onBlur, value } }) => (
						<View
							style={{
								flexDirection: 'row',
								width: '90%',
								justifyContent: 'center',
							}}
						>
							<Button
								mode={value ? 'contained' : 'outlined'}
								onPress={() => {
									setValue('inOut', true)
								}}
								style={{
									padding: 10,
									borderTopRightRadius: 0,
									borderBottomRightRadius: 0,
								}}
							>
								Entrée
							</Button>
							<Button
								mode={!value ? 'contained' : 'outlined'}
								onPress={() => {
									setValue('inOut', false)
								}}
								style={{
									padding: 10,
									borderTopLeftRadius: 0,
									borderBottomLeftRadius: 0,
								}}
							>
								Sortie
							</Button>
						</View>
					)}
				/>
				{errors?.dateStart && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.dateStart.message}
					</Text>
				)}
			</View>
			{/* DATE INPUT END */}
		</View>
	)
}

export default InventoryFormStep1
