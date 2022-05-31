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

const InventoryFormStep3 = (props) => {
	const {
		control,
		errors,
		setValue,
		electricMeter,
		gazMeter,
		waterMeter,
		setElectricMeter,
		setGazMeter,
		setWaterMeter,
	} = props
	const theme = useTheme()

	return (
		<View style={{ flex: 1, width: '100%', marginTop: 10 }}>
			{/* ElectricStats INPUT START */}
			<View style={{ width: '100%' }}>
				<TextInput
					mode="outlined"
					label="Référence du compteur électrique"
					onChangeText={(value) => {
						setElectricMeter({
							...electricMeter,
							ref: value,
						})
					}}
					value={electricMeter.ref}
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
				<TextInput
					mode="outlined"
					label="Nombre de Kw/h"
					onChangeText={(value) => {
						setElectricMeter({
							...electricMeter,
							value: value,
						})
					}}
					value={electricMeter.value}
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

			{/* GazStats INPUT START */}
			<View style={{ width: '100%' }}>
				<TextInput
					mode="outlined"
					label="Référence du compteur de gaz"
					onChangeText={(value) => {
						setGazMeter({
							...gazMeter,
							ref: value,
						})
					}}
					value={gazMeter.ref}
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
				<TextInput
					mode="outlined"
					label="Nombre de M³ de gaz"
					onChangeText={(value) => {
						setGazMeter({
							...gazMeter,
							value: value,
						})
					}}
					value={gazMeter.value}
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

			{/* GazStats INPUT START */}
			<View style={{ width: '100%' }}>
				<TextInput
					mode="outlined"
					label="Référence du compteur d'eau"
					onChangeText={(value) => {
						setWaterMeter({
							...waterMeter,
							ref: value,
						})
					}}
					value={waterMeter.ref}
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
				<TextInput
					mode="outlined"
					label="Nombre de M³ d'eau"
					onChangeText={(value) => {
						setWaterMeter({
							...waterMeter,
							value: value,
						})
					}}
					value={waterMeter.value}
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
		</View>
	)
}

export default InventoryFormStep3
