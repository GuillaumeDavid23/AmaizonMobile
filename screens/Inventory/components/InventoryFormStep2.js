// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import react hook form for edit form
import { Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput } from 'react-native-paper'
//Import customs elements

//Import fetch method
import validate from '../../../utils/validation'
import { PaperSelect } from 'react-native-paper-select'

const InventoryFormStep2 = (props) => {
	const {
		control,
		errors,
		setValue,
		stuffs,
		setStuffs,
		heatingTypes,
		setHeatingTypes,
		hotWaterTypes,
		setHotWaterTypes,
	} = props

	const theme = useTheme()
	
	return (
		<View style={{ flex: 1, width: '100%', marginTop: 20 }}>
			{/* CLEF INPUT START */}
			<View style={{ alignItems: 'center' }}>
				<Controller
					control={control}
					rules={validate.number}
					name="keyNumber"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							mode="outlined"
							label="Nombre de clef remise"
							keyboardType="numeric"
							onBlur={onBlur}
							onChangeText={onChange}
							autoComplete="keyNumber"
							value={value}
							error={errors?.keyNumber}
							style={{ width: '90%' }}
							theme={{ colors: { error: '#f57c00' } }}
							right={
								<TextInput.Icon
									name="key"
									color={theme.colors.primary}
								/>
							}
						/>
					)}
				/>
				{errors?.keyNumber && (
					<Text style={{ color: theme.colors.warning }}>
						{errors.keyNumber.message}
					</Text>
				)}
			</View>
			{/* CLEF INPUT END */}

			{/* LST_EQUIPEMENTS INPUT START */}
			<View
				style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
			>
				<View style={{ width: '90%' }}>
					<Controller
						control={control}
						rules={validate.required}
						name="lst_equipement"
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Liste des équipements"
								value={stuffs.value}
								onSelection={(lst) => {
									setValue('lst_equipement', lst.selectedList)
									setStuffs({
										...stuffs,
										value: lst.text,
										selectedList: lst.selectedList,
										error: '',
									})
								}}
								arrayList={[...stuffs.list]}
								selectedArrayList={stuffs.selectedList}
								errorText={stuffs.error}
								multiEnable={true}
								style={{
									width: '90%',
								}}
							/>
						)}
					/>
					{errors?.lst_equipement && (
						<Text
							style={{
								color: theme.colors.warning,
								alignSelf: 'center',
							}}
						>
							{errors.lst_equipement.message}
						</Text>
					)}
				</View>
			</View>
			{/* LST_EQUIPEMENTS INPUT END */}

			{/* LST_HEATER INPUT START */}
			<View
				style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
			>
				<View style={{ width: '90%' }}>
					<Controller
						control={control}
						rules={validate.required}
						name="lst_heater"
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Chauffage"
								value={heatingTypes.value}
								onSelection={(lst) => {
									setValue('lst_heater', lst.selectedList)
									setHeatingTypes({
										...heatingTypes,
										value: lst.text,
										selectedList: lst.selectedList,
										error: '',
									})
								}}
								arrayList={[...heatingTypes.list]}
								selectedArrayList={heatingTypes.selectedList}
								errorText={heatingTypes.error}
								multiEnable={true}
								style={{
									width: '90%',
								}}
							/>
						)}
					/>
					{errors?.lst_heater && (
						<Text
							style={{
								color: theme.colors.warning,
								alignSelf: 'center',
							}}
						>
							{errors.lst_heater.message}
						</Text>
					)}
				</View>
			</View>
			{/* LST_HEATER INPUT END */}

			{/* LST_HOTWATER INPUT START */}
			<View
				style={{ width: '100%', alignItems: 'center', marginTop: 30 }}
			>
				<View style={{ width: '90%' }}>
					<Controller
						control={control}
						rules={validate.required}
						name="lst_hotWater"
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Production d'eau chaude"
								value={hotWaterTypes.value}
								onSelection={(lst) => {
									setValue('lst_hotWater', lst.selectedList)
									setHotWaterTypes({
										...hotWaterTypes,
										value: lst.text,
										selectedList: lst.selectedList,
										error: '',
									})
								}}
								arrayList={[...hotWaterTypes.list]}
								selectedArrayList={hotWaterTypes.selectedList}
								errorText={hotWaterTypes.error}
								multiEnable={true}
								style={{
									width: '90%',
								}}
							/>
						)}
					/>
					{errors?.lst_hotWater && (
						<Text
							style={{
								color: theme.colors.warning,
								alignSelf: 'center',
							}}
						>
							{errors.lst_hotWater.message}
						</Text>
					)}
				</View>
			</View>
			{/* LST_HOTWATER INPUT END */}
		</View>
	)
}

export default InventoryFormStep2
