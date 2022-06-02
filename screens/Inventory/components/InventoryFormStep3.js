// Import react element
import * as React from 'react'
import { Text, View } from 'react-native'

//Import selector for user infos
import { useDispatch, useSelector } from 'react-redux'

//Import react hook form for edit form
import { Controller } from 'react-hook-form'

//Import framework element
import { useTheme, TextInput, Button, Divider, Title } from 'react-native-paper'

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
		<View
			style={{
				flex: 1,
				width: '100%',
				marginTop: 10,
				alignItems: 'center',
			}}
		>
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>
			<Title>Electricité</Title>
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>
			{/* ElectricStats INPUT START */}
			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<TextInput
					mode="outlined"
					label="Réf. compteur"
					onChangeText={(value) => {
						setElectricMeter({
							...electricMeter,
							ref: value,
						})
					}}
					value={electricMeter.ref}
					error={errors?.lst_statsMeters}
					style={{
						width: '43%',
						alignSelf: 'center',
						height: 50,
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="lightbulb-outline"
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
						width: '43%',
						alignSelf: 'center',
						height: 50,
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="lightbulb-outline"
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
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>
			<Title>Gaz</Title>
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>

			<View
				style={{
					width: '100%',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<TextInput
					mode="outlined"
					label="Réf. compteur"
					onChangeText={(value) => {
						setGazMeter({
							...gazMeter,
							ref: value,
						})
					}}
					value={gazMeter.ref}
					error={errors?.lst_statsMeters}
					style={{
						width: '43%',
						alignSelf: 'center',
						height: 50,
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="bottle-tonic-outline"
							color={theme.colors.primary}
						/>
					}
				/>
				<TextInput
					mode="outlined"
					label="Nombre de M³"
					onChangeText={(value) => {
						setGazMeter({
							...gazMeter,
							value: value,
						})
					}}
					value={gazMeter.value}
					error={errors?.lst_statsMeters}
					style={{
						width: '43%',
						alignSelf: 'center',
						height: 50,
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="bottle-tonic-outline"
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
			{/* GazStats INPUT END */}
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>
			<Title>Eau</Title>
			<Divider
				style={{
					height: 2,
					width: '90%',
					backgroundColor: 'grey',
					marginTop: 10,
					marginBottom: 5,
				}}
			/>
			{/* waterStats INPUT START */}
			<View
				style={{
					width: '100%',
					marginBottom: 30,
					flexDirection: 'row',
					justifyContent: 'space-evenly',
				}}
			>
				<TextInput
					mode="outlined"
					label="Réf. compteur"
					onChangeText={(value) => {
						setWaterMeter({
							...waterMeter,
							ref: value,
						})
					}}
					value={waterMeter.ref}
					error={errors?.lst_statsMeters}
					style={{
						width: '43%',
						height: 50,
						alignSelf: 'center',
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="water-outline"
							color={theme.colors.primary}
						/>
					}
				/>
				<TextInput
					mode="outlined"
					label="Nombre de M³"
					onChangeText={(value) => {
						setWaterMeter({
							...waterMeter,
							value: value,
						})
					}}
					value={waterMeter.value}
					error={errors?.lst_statsMeters}
					style={{
						width: '43%',
						height: 50,
						alignSelf: 'center',
					}}
					theme={{ colors: { error: '#f57c00' } }}
					right={
						<TextInput.Icon
							name="water-outline"
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
			{/* waterStats INPUT END */}
		</View>
	)
}

export default InventoryFormStep3
