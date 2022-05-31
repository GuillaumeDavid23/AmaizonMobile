import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text, View } from 'react-native'
import { PaperSelect } from 'react-native-paper-select'
import { REGID } from '../../../utils/regex'

const Page4 = ({ display, control, errors }) => {
	// Déclaration options selects Stuffs:
	const [stuffs, setStuffs] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Sonnerie' },
			{ _id: 2, value: 'Interphone' },
			{ _id: 3, value: 'Alarme' },
			{ _id: 4, value: 'Cave' },
			{ _id: 5, value: 'Parking / Boxe / Garage' },
			{ _id: 6, value: 'Jardin' },
			{ _id: 7, value: 'Balcon / Terrasse' },
			{ _id: 8, value: 'Boite aux lettres' },
		],
		selectedList: [],
		error: '',
	})

	// Déclaration options selects Heat:
	const heatTypes = [
		{ _id: 1, value: 'Collectif' },
		{ _id: 2, value: 'Gaz' },
		{ _id: 3, value: 'Elec' },
		{ _id: 4, value: 'Autre' },
	]
	const [heatingTypes, setHeatingTypes] = useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})
	const [hotWaterTypes, sethotWaterTypes] = useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})

	return (
		<View style={{ display, width: 300 }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Infos techniques:
			</Text>
			{/* List_Equipments Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					// rules={{
					// 	pattern: {
					// 		value: REGNUM.value,
					// 		message: REGNUM.message,
					// 	},
					// }}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Liste équipements"
							value={stuffs.value}
							onSelection={onChange}
							arrayList={[...stuffs.list]}
							selectedArrayList={stuffs.selectedList}
							errorText={stuffs.error}
							multiEnable={true}
							// textInputMode="flat"
							// searchStyle={{
							// 	iconColor: 'red',
							// }}
						/>
					)}
					name="list_equipments"
				/>
				{/* List_Equipments Form show-error part */}
				{errors?.list_equipments && (
					<Text style={{ color: 'red' }}>
						{errors.list_equipments.message}
					</Text>
				)}
			</View>
			{/* HeatingType Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						pattern: {
							value: REGID.value,
							message: REGID.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Type de chauffage"
							value={value}
							onSelection={onChange}
							arrayList={[...heatingTypes.list]}
							selectedArrayList={heatingTypes.selectedList}
							errorText={heatingTypes.error}
							multiEnable={false}
							checkboxLabelStyle={{
								color: 'black',
								fontWeight: '700',
							}}
						/>
					)}
					name="heatingType"
				/>
				{/* HeatingType Form show-error part */}
				{errors?.heatingType && (
					<Text style={{ color: 'red' }}>
						{errors.heatingType.message}
					</Text>
				)}
			</View>
			{/* HotWaterType Form part */}
			<View style={{ marginVertical: 20 }}>
				<Controller
					control={control}
					rules={{
						pattern: {
							value: REGID.value,
							message: REGID.message,
						},
					}}
					render={({ field: { onChange, onBlur, value } }) => (
						<PaperSelect
							label="Type de chauffage d'eau chaude"
							value={value}
							onSelection={onChange}
							arrayList={[...hotWaterTypes.list]}
							selectedArrayList={hotWaterTypes.selectedList}
							errorText={hotWaterTypes.error}
							multiEnable={false}
							checkboxLabelStyle={{
								color: 'black',
								fontWeight: '700',
							}}
						/>
					)}
					name="hotWaterType"
				/>
				{/* HotWaterType Form show-error part */}
				{errors?.hotWaterType && (
					<Text style={{ color: 'red' }}>
						{errors.hotWaterType.message}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Page4
