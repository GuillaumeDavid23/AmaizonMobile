import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { Text, View } from 'react-native'
import { PaperSelect } from 'react-native-paper-select'
import { REGSTRING } from '../../../utils/regex'

const Page1 = ({ display, control, errors }) => {
	// Déclaration options selects propertyType:
	const [propertyTypes, setPropertyTypes] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Maison' },
			{ _id: 2, value: 'Appartement' },
		],
		selectedList: [],
		error: '',
	})

	return (
		<View style={{ display }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Infos Principales:
			</Text>
			{/* Title Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Intitulé de la propriété requis.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Intitulé"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.title}
							style={{ width: 300 }}
						/>
					)}
					name="title"
				/>
				{/* Title Form show-error part */}
				{errors?.title && (
					<Text style={{ color: 'red' }}>{errors.title.message}</Text>
				)}
			</View>
			{/* PropertyType Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: 'Type de propriété requis.',
						},
						pattern: {
							value: REGSTRING.value,
							message: REGSTRING.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Type de propriété"
							value={propertyTypes.value}
							onSelection={onChange}
							arrayList={[...propertyTypes.list]}
							selectedArrayList={propertyTypes.selectedList}
							errorText={propertyTypes.error}
							multiEnable={false}
							checkboxLabelStyle={{
								color: 'black',
								fontWeight: '700',
							}}
						/>
					)}
					name="propertyType"
				/>
				{/* PropertyType Form show-error part */}
				{errors?.propertyType && (
					<Text style={{ color: 'red' }}>
						{errors.propertyType.message}
					</Text>
				)}
			</View>
			{/* Description Form part */}
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
							label="Description"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							error={errors?.description}
							style={{ width: 300, height: 150 }}
						/>
					)}
					name="description"
				/>
				{/* Description Form show-error part */}
				{errors?.description && (
					<Text style={{ color: 'red' }}>
						{errors.description.message}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Page1
