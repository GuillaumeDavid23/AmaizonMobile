import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { Text, View } from 'react-native'
import { REGNUM, REGSTRING } from '../../../utils/regex'

const Page3 = ({ display, control, errors }) => {
	return (
		<View style={{ display }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Infos Principales 2:
			</Text>
			{/* Surface Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Surface requise.',
						},
						pattern: {
							value: REGNUM.value,
							message: REGNUM.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Surface"
							keyboardType="numeric"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.surface}
							style={{ width: 300 }}
						/>
					)}
					name="surface"
				/>
				{/* Surface Form show-error part */}
				{errors?.surface && (
					<Text style={{ color: 'red' }}>
						{errors.surface.message}
					</Text>
				)}
			</View>
			{/* RoomNumber Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Nombre de chambres requis.',
						},
						pattern: {
							value: REGNUM.value,
							message: REGNUM.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Nombre de chambres"
							keyboardType="numeric"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.roomNumber}
							style={{ width: 300 }}
						/>
					)}
					name="roomNumber"
				/>
				{/* RoomNumber Form show-error part */}
				{errors?.roomNumber && (
					<Text style={{ color: 'red' }}>
						{errors.roomNumber.message}
					</Text>
				)}
			</View>
			{/* ElectricMeterRef Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence compteur électrique"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.electricMeterRef}
							style={{ width: 300 }}
						/>
					)}
					name="electricMeterRef"
				/>
				{/* ElectricMeterRef Form show-error part */}
				{errors?.electricMeterRef && (
					<Text style={{ color: 'red' }}>
						{errors.electricMeterRef.message}
					</Text>
				)}
			</View>
			{/* GasMeterRef Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Référence compteur de gaz"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.gasMeterRef}
							style={{ width: 300 }}
						/>
					)}
					name="gasMeterRef"
				/>
				{/* GasMeterRef Form show-error part */}
				{errors?.gasMeterRef && (
					<Text style={{ color: 'red' }}>
						{errors.gasMeterRef.message}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Page3
