import { View, Text } from 'react-native'
import { Controller } from 'react-hook-form'
import { TextInput, Switch } from 'react-native-paper'
import CustomButton from '../../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import { REGSTRING } from '../../../utils/regex'
import RNPickerSelect from 'react-native-picker-select'

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
		{ label: '09h', value: '09:00' },
		{ label: '09h30', value: '09:30' },
		{ label: '10h', value: '10:00' },
		{ label: '10h30', value: '10:30' },
		{ label: '11h', value: '11:00' },
		{ label: '11h30', value: '11:30' },
		{ label: '12h', value: '12:00' },
		{ label: '12h30', value: '12:30' },
		{ label: '13h', value: '13:00' },
		{ label: '13h30', value: '13:30' },
		{ label: '14h', value: '14:00' },
		{ label: '14h30', value: '14:30' },
		{ label: '15h', value: '15:00' },
		{ label: '15h30', value: '15:30' },
		{ label: '16h', value: '16:00' },
		{ label: '16h30', value: '16:30' },
		{ label: '17h', value: '17:00' },
		{ label: '17h30', value: '17:30' },
		{ label: '18h', value: '18:00' },
		{ label: '18h30', value: '18:30' },
		{ label: '19h', value: '19:00' },
	]

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

			<View style={{ flexDirection: 'row' }}>
				{/* StartTime Form part */}
				<View style={{ marginVertical: 20, width: '50%' }}>
					<Controller
						control={control}
						rules={{
							required: {
								message: 'Heure de début requise.',
							},
							// pattern: {
							// 	value: REGSTRING.value,
							// 	message: REGSTRING.message,
							// },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<RNPickerSelect
								onValueChange={onChange}
								items={timeSlots}
								value={value}
								placeholder={
									value !== undefined
										? {
												label:
													value.split(':')[0] +
													'h' +
													value.split(':')[1],
												value,
										  }
										: {
												label: 'Heure de début',
												value: null,
										  }
								}
								// style={{ textAlign: 'center' }}
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
				<View style={{ marginVertical: 20, width: '50%' }}>
					<Controller
						control={control}
						rules={{
							required: {
								message: 'Heure de fin requise.',
							},
							// pattern: {
							// 	value: REGSTRING.value,
							// 	message: REGSTRING.message,
							// },
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<RNPickerSelect
								onValueChange={onChange}
								items={timeSlots}
								value={value}
								placeholder={
									value !== undefined
										? {
												label:
													value.split(':')[0] +
													'h' +
													value.split(':')[1],
												value,
										  }
										: {
												label: 'Heure de fin',
												value: null,
										  }
								}
								// style={{ textAlign: 'center' }}
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
					<View style={{ display: outdoor ? 'flex' : 'none' }}>
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
