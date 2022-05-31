import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { Text, View } from 'react-native'
import { REGSTRING, REGID } from '../../../utils/regex'

const Page2 = ({ display, control, errors }) => {
	return (
		<View style={{ display }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Infos Géographiques:
			</Text>
			{/* Location Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Adresse requise.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Adresse"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.location}
							style={{ width: 300 }}
						/>
					)}
					name="location"
				/>
				{/* Location Form show-error part */}
				{errors?.location && (
					<Text style={{ color: 'red' }}>
						{errors.location.message}
					</Text>
				)}
			</View>
			{/* PostalCode Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Code Postal requis.',
						},
						pattern: {
							value: REGID.value,
							message: REGID.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Code Postal"
							keyboardType="numeric"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.postalCode}
							style={{ width: 300 }}
						/>
					)}
					name="postalCode"
				/>
				{/* PostalCode Form show-error part */}
				{errors?.postalCode && (
					<Text style={{ color: 'red' }}>
						{errors.postalCode.message}
					</Text>
				)}
			</View>
			{/* City Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Ville requise.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Ville"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.city}
							style={{ width: 300 }}
						/>
					)}
					name="city"
				/>
				{/* City Form show-error part */}
				{errors?.city && (
					<Text style={{ color: 'red' }}>{errors.city.message}</Text>
				)}
			</View>
			{/* Country Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Pays requis.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Pays"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.country}
							style={{ width: 300 }}
						/>
					)}
					name="country"
				/>
				{/* Country Form show-error part */}
				{errors?.country && (
					<Text style={{ color: 'red' }}>
						{errors.country.message}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Page2
