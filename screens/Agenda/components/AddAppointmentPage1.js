import { useState } from 'react'
import { View, Text } from 'react-native'
import { Controller } from 'react-hook-form'
import { TextInput, Switch } from 'react-native-paper'
import { PaperSelect } from 'react-native-paper-select'
import CustomButton from '../../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import { REGSTRING } from '../../../utils/regex'

const AddAppointmentPage1 = ({
	display,
	control,
	errors,
	outdoor,
	setOutdoor,
	setVisiblePage,
}) => {
	// Déclaration options selects des horraires:
	const timeSlots = [
		{ _id: 1, value: '09:00' },
		{ _id: 2, value: '09:30' },
		{ _id: 3, value: '10:00' },
		{ _id: 4, value: '10:30' },
		{ _id: 5, value: '11:00' },
		{ _id: 6, value: '11:30' },
		{ _id: 7, value: '12:00' },
		{ _id: 8, value: '12:30' },
		{ _id: 9, value: '13:00' },
		{ _id: 10, value: '13:30' },
		{ _id: 11, value: '14:00' },
		{ _id: 12, value: '14:30' },
		{ _id: 13, value: '15:00' },
		{ _id: 14, value: '15:30' },
		{ _id: 15, value: '16:00' },
		{ _id: 16, value: '16:30' },
		{ _id: 17, value: '17:00' },
		{ _id: 18, value: '17:30' },
		{ _id: 19, value: '18:00' },
		{ _id: 20, value: '18:30' },
		{ _id: 21, value: '19:00' },
	]
	const [startTimeSlots, setStartTimeSlots] = useState({
		value: '',
		list: timeSlots,
		selectedList: [],
		error: '',
	})
	const [endTimeSlotsList, setEndTimeSlotsList] = useState(timeSlots)
	const [endTimeSlots, setEndTimeSlots] = useState({
		value: '',
		list: endTimeSlotsList,
		selectedList: [],
		error: '',
	})
	// useEffect(() => {
	// 	console.log(1)
	// }, [startTimeSlots])

	return (
		<View style={{ display }}>
			<View style={{ marginVertical: 20 }}>
				{/* Date Form part */}
				<Controller
					control={control}
					rules={{
						required: {
							message:
								'Vous devez indiquer une date pour le rendez-vous.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Date"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.date}
							style={{ width: 300 }}
						/>
					)}
					name="date"
				/>
				{/* Date Form show-error part */}
				{errors?.date && (
					<Text style={{ color: 'red' }}>{errors.date.message}</Text>
				)}
			</View>

			{/* StartTime Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							message: 'Heure de début requise.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Heure de départ"
							value={startTimeSlots.value}
							onSelection={onChange}
							arrayList={[...startTimeSlots.list]}
							selectedArrayList={startTimeSlots.selectedList}
							errorText={startTimeSlots.error}
							multiEnable={false}
							checkboxLabelStyle={{
								color: 'black',
								fontWeight: '700',
							}}
						/>
					)}
					name="startTime"
				/>
				{/* StartTime Form show-error part */}
				{errors?.startTime && (
					<Text style={{ color: 'red' }}>
						{errors.startTime.message}
					</Text>
				)}
			</View>

			{/* EndTime Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							message: 'Heure de fin requise.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Heure de fin"
							value={endTimeSlots.value}
							onSelection={onChange}
							arrayList={[...endTimeSlots.list]}
							selectedArrayList={endTimeSlots.selectedList}
							errorText={endTimeSlots.error}
							multiEnable={false}
							checkboxLabelStyle={{
								color: 'black',
								fontWeight: '700',
							}}
						/>
					)}
					name="endTime"
				/>
				{/* EndTime Form show-error part */}
				{errors?.endTime && (
					<Text style={{ color: 'red' }}>
						{errors.endTime.message}
					</Text>
				)}
			</View>

			{/* Outdoor Form part */}
			<View style={{ marginVertical: 20 }}>
				<Text>Le rendez-vous est en agence:</Text>
				<View>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text>Oui</Text>
						<Switch
							value={outdoor}
							onValueChange={() => setOutdoor(!outdoor)}
						/>
						<Text>Non</Text>
					</View>
					{/* Adresse du rendez-vous si à l'extérieur */}
					{outdoor && (
						<View>
							<Controller
								control={control}
								rules={{
									required: {
										value: true,
										message: 'Adresse du rendez-vous.',
									},
									pattern: {
										value: REGSTRING.value,
										message: REGSTRING.message,
									},
								}}
								render={({
									field: { onChange, onBlur, value },
								}) => (
									<TextInput
										mode="outlined"
										label="Adresse extérieure"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										error={errors?.address}
										style={{ width: 300 }}
									/>
								)}
								name="address"
							/>
							{/* Address Form show-error part */}
							{errors?.address && (
								<Text style={{ color: 'red' }}>
									{errors.address.message}
								</Text>
							)}
						</View>
					)}
				</View>
			</View>

			<CustomButton
				style={{ marginBottom: 25, marginHorizontal: 25 }}
				text="Suivant"
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				onPress={() => setVisiblePage(2)}
				reversed
			/>
		</View>
	)
}

export default AddAppointmentPage1
