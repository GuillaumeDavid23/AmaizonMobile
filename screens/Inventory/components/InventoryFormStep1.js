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
	const { control, errors, setValue } = props
	const user = useSelector((state) => state.user.auth)

	const dispatch = useDispatch()
	const theme = useTheme()
	const [date, setDate] = React.useState(new Date())
	const [dateTimeShow, setDateTimeShow] = React.useState(false)

	return (
		<View style={{ flex: 1, width: '100%', marginTop: 10 }}>
			{/* PropertyRef INPUT START */}
			<View style={{ width: '100%' }}>
				<Controller
					control={control}
					rules={validate.alphaNumeric}
					name="PropertyRef"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence du bien"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="name-family"
							value={value}
							error={errors?.PropertyRef}
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
			{/* PropertyRef INPUT END */}

			{/* CLIENT REF INPUT START */}
			<View style={{ marginTop: 15, alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.alphaNumeric}
					name="userReference"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence du client"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.userReference}
							style={{ width: '90%' }}
							theme={{ colors: { error: '#f57c00' } }}
							right={
								<TextInput.Icon
									name="account-outline"
									color={theme.colors.primary}
								/>
							}
						/>
					)}
				/>
				{errors?.userReference && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.userReference.message}
					</Text>
				)}
			</View>
			{/* CLIENT REF INPUT END */}

			{/* OLD CLIENT REF INPUT START */}
			<View style={{ marginTop: 15, alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.alphaNumeric}
					name="previousBuyerRef"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence de l'ancien locataire / Propriétaire"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.previousBuyerRef}
							style={{ width: '90%' }}
							theme={{ colors: { error: '#f57c00' } }}
							right={
								<TextInput.Icon
									name="account-outline"
									color={theme.colors.primary}
								/>
							}
						/>
					)}
				/>
				{errors?.previousBuyerRef && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.previousBuyerRef.message}
					</Text>
				)}
			</View>
			{/* CLIENT REF INPUT END */}

			{/* DATE INPUT START */}
			<View style={{ marginTop: 15, alignItems: 'center' }}>
				<Controller
					control={control}
					name="date"
					rules={{
						required: {
							value: true,
							message: 'Champ requis',
						},
					}}
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
							right={
								<TextInput.Icon
									name="calendar"
									color={theme.colors.primary}
								/>
							}
						/>
					)}
				/>
				{errors?.date && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.date.message}
					</Text>
				)}
				{dateTimeShow && (
					<DateTimePicker
						mode="date"
						value={new Date()}
						is24Hour={true}
						onChange={(event, date) => {
							setDateTimeShow(false)
							setValue('date', moment(date).format('YYYY-MM-DD'))
						}}
					/>
				)}
			</View>
			{/* DATE INPUT END */}

			{/* In OUT INPUT START */}
			<View style={{ marginTop: 15, alignItems: 'center' }}>
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
									flex: 1,
									padding: 10,
									borderTopRightRadius: 0,
									borderBottomRightRadius: 0,
								}}
								icon="door"
							>
								Entrée
							</Button>
							<Button
								mode={!value ? 'contained' : 'outlined'}
								onPress={() => {
									setValue('inOut', false)
								}}
								style={{
									flex: 1,
									padding: 10,
									borderTopLeftRadius: 0,
									borderBottomLeftRadius: 0,
								}}
								icon="door-open"
								contentStyle={{
									flex: 1,
									flexDirection: 'row-reverse',
								}}
							>
								Sortie
							</Button>
						</View>
					)}
				/>
				{errors?.inOut && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.inOut.message}
					</Text>
				)}
			</View>
			{/* In OUT INPUT END */}
		</View>
	)
}

export default InventoryFormStep1
