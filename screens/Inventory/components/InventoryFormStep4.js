// Import react element
import * as React from 'react'
import { Text, View, Animated } from 'react-native'

//Import react hook form for edit form
import { Controller } from 'react-hook-form'
import { Slider } from '@miblanchard/react-native-slider'

//Import framework element
import {
	useTheme,
	TextInput,
	Button,
	Divider,
	Title,
	FAB,
	List,
	Portal,
	Dialog,
} from 'react-native-paper'

import validate from '../../../utils/validation'
import { FlatList } from 'react-native-gesture-handler'

const InventoryFormStep4 = (props) => {
	const { control, errors, setValue, roomsDetails, setRoomsDetails } = props
	const theme = useTheme()
	const [visible, setVisible] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [addRoom, setAddRoom] = React.useState('')

	const labelNames = {
		0: 'TM',
		1: 'MAUVAIS',
		2: 'MOYEN',
		3: 'BON',
		4: 'TB',
	}
	const labelSlider = (label) => {
		return (
			<View
				style={{
					paddingTop: 20,
				}}
			>
				<View
					style={{
						marginLeft: 10,
						height: 15,
						width: 3,
						backgroundColor: 'black',
						alignSelf: 'flex-start',
					}}
				></View>
				<Text>{labelNames[label]}</Text>
			</View>
		)
	}
	const fadeAnim = React.useRef(new Animated.Value(400)).current
	const showDialog = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 800,
			useNativeDriver: true,
		}).start(setVisible(true))
	}

	const hideDialog = () => {
		Animated.timing(fadeAnim, {
			toValue: -400,
			duration: 800,
			useNativeDriver: true,
		}).start(() => {
			setVisible(false)
		})
	}
	return (
		<View style={{ marginBottom: 30, width: '90%' }}>
			{roomsDetails.length === 0 && (
				<Title style={{ textAlign: 'center', color: 'grey' }}>
					Ajouter une pièce pour commencer
				</Title>
			)}
			{roomsDetails.length > 0 &&
				roomsDetails.map((room, index) => {
					return (
						<View
							key={index}
							style={{
								height: 100,
								backgroundColor: theme.colors.accent,
								borderRadius: 10,
								marginBottom: 20,
								paddingHorizontal: 20,
							}}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
								}}
							>
								<Title>{room.name}</Title>
								<Button
									onPress={() => {
										let spliceArr = [...roomsDetails]
										spliceArr.splice(index, 1)
										setRoomsDetails(spliceArr)
									}}
									icon="trash-can-outline"
									contentStyle={{
										flexDirection: 'row-reverse',
									}}
									labelStyle={{
										color: theme.colors.error,
										fontSize: 20,
									}}
								></Button>
							</View>
							<Slider
								value={room.condition}
								minimumValue={1}
								maximumValue={6}
								step={1}
								trackClickable={true}
								trackMarks={[1, 2, 3, 4, 5, 6]}
								renderTrackMarkComponent={(mark) =>
									labelSlider(mark)
								}
								onValueChange={(value) => {
									switch (value[0]) {
										case 1:
											let newArr = [...roomsDetails]
											newArr[index] = {
												...room,
												condition: 1,
											}
											setRoomsDetails(newArr)
											break
										case 2:
											let newArr1 = [...roomsDetails]
											newArr1[index] = {
												...room,
												condition: 2,
											}
											setRoomsDetails(newArr1)
											break
										case 3:
											let newArr2 = [...roomsDetails]
											newArr2[index] = {
												...room,
												condition: 3,
											}
											setRoomsDetails(newArr2)
											break
										case 4:
											let newArr3 = [...roomsDetails]
											newArr3[index] = {
												...room,
												condition: 4,
											}
											setRoomsDetails(newArr3)
											break
										case 5:
											let newArr4 = [...roomsDetails]
											newArr4[index] = {
												...room,
												condition: 5,
											}
											setRoomsDetails(newArr4)
											break
										case 6:
											let newArr5 = [...roomsDetails]
											newArr5[index] = {
												...room,
												condition: 6,
											}
											setRoomsDetails(newArr5)
											break
										default:
											break
									}
								}}
								maximumTrackTintColor={theme.colors.accent}
								minimumTrackTintColor={theme.colors.primary}
							/>
						</View>
					)
				})}

			<Button
				style={{
					backgroundColor: theme.colors.success,
					borderRadius: 50,
					height: 50,
				}}
				icon="home-plus-outline"
				contentStyle={{ borderRadius: 50, height: 50 }}
				labelStyle={{
					color: 'white',
					fontSize: 16,
				}}
				onPress={showDialog}
			>
				Ajouter une pièce
			</Button>
			<Portal>
				<Dialog
					visible={visible}
					onDismiss={hideDialog}
					style={{
						backgroundColor: 'white',
						transform: [{ translateX: fadeAnim }],
					}}
				>
					<Dialog.Title
						style={{
							color: theme.colors.primary,
							textAlign: 'center',
						}}
					>
						Ajouter une pièce
					</Dialog.Title>
					<Dialog.Content>
						<TextInput
							error={error}
							mode="outlined"
							label="Nom de la pièce"
							onChangeText={(value) => {
								setAddRoom(value)
							}}
							value={addRoom}
							style={{
								width: '90%',
								alignSelf: 'center',
								height: 50,
							}}
						/>
						{error && (<Text style={{color: 'red', textAlign: 'center'}}>Veuillez remplir correctement le nom</Text>)}
					</Dialog.Content>
					<Dialog.Actions
						style={{
							width: '100%',
							justifyContent: 'space-between',
						}}
					>
						<Button
							onPress={hideDialog}
							style={{
								backgroundColor: theme.colors.error,
							}}
							labelStyle={{ color: 'white' }}
						>
							Fermer
						</Button>
						<Button
							onPress={() => {
								if (addRoom != '') {
									roomsDetails.push({
										name: addRoom,
										condition: 3,
									})
									setAddRoom('')
									hideDialog()
								}else{
									setError(true)
								}
						
							}}
							style={{
								backgroundColor: theme.colors.success,
							}}
							labelStyle={{ color: 'white' }}
						>
							Valider
						</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	)
}

export default InventoryFormStep4
