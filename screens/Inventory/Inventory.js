import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { FAB, Title, useTheme } from 'react-native-paper'
import logo from '../../assets/images/logoFull.png'
import InventoryFormStep1 from './components/InventoryFormStep1'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useForm } from 'react-hook-form'
import InventoryFormStep2 from './components/InventoryFormStep2'
import moment from 'moment'
import InventoryFormStep3 from './components/InventoryFormStep3'
import InventoryFormStep4 from './components/InventoryFormStep4'
import { createInventory } from '../../services/Inventory'
import { useSelector } from 'react-redux'

export default function InventoryScreen({ navigation }) {
	const theme = useTheme()
	const token = useSelector((state) => state.user.auth.token)
	const user = useSelector((state) => state.user.auth.data)

	//Création du formulaire
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			PropertyRef: 'FGDTRATFTY',
			userReference: 'CL00000010',
			previousBuyerRef: 'CL00000010',
			date: moment(new Date()).format('YYYY-MM-DD'),
			inOut: false,
			keyNumber: '2',
			lst_equipement: [],
			lst_heater: [],
			lst_hotWater: [],
			lst_statsMeters: [],
			lst_roomDetails: [],
			id_agent: user._id,
		},
		mode: 'onChange',
		shouldFocusError: true,
	})

	// Déclaration options selects Stuffs:
	const [stuffs, setStuffs] = React.useState({
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
	const [heatingTypes, setHeatingTypes] = React.useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})
	const [hotWaterTypes, setHotWaterTypes] = React.useState({
		value: '',
		list: heatTypes,
		selectedList: [],
		error: '',
	})
	const [electricMeter, setElectricMeter] = React.useState({
		name: 'electric',
		ref: 'EL12457896',
		value: '12001',
	})
	const [gazMeter, setGazMeter] = React.useState({
		name: 'gaz',
		ref: 'GZ54121478',
		value: '1205',
	})
	const [waterMeter, setWaterMeter] = React.useState({
		name: 'water',
		ref: 'WA45789568',
		value: '15014',
	})
	const [roomsDetails, setRoomsDetails] = React.useState([
		
	])

	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		setValue('lst_statsMeters', [electricMeter, gazMeter, waterMeter])
		data.lst_statsMeters = [electricMeter, gazMeter, waterMeter]
	}

	const onFinish = (data) => {
		if (roomsDetails.length > 0) {
			data.lst_roomDetails = roomsDetails
		}
		createInventory(data, token).then((response)=> {
			console.log('resp:' ,response);
			navigation.navigate('Propriétés', {
				screen: 'InventoryList',
				initial: false,
			})
		}).catch((error) => {
			console.log('error: ', error);
		})
	}


	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			<Title>Nouvel état des lieux</Title>
			<View style={{ flex: 1, width: '100%' }}>
				{/* Début des étapes */}
				<ProgressSteps
					labelColor="grey"
					labelFontSize={12}
					activeStepIconBorderColor={
						Object.keys(errors).length > 0
							? theme.colors.warning
							: theme.colors.primary
					}
					activeLabelColor={
						Object.keys(errors).length > 0
							? theme.colors.warning
							: theme.colors.primary
					}
					progressBarColor={theme.colors.primary}
					disabledStepIconColor={theme.colors.primary}
					completedStepIconColor={theme.colors.success}
					completedProgressBarColor={theme.colors.success}
				>
					{/* Début étape numéro 1 */}
					<ProgressStep
						label="Références"
						nextBtnText="Suivant"
						previousBtnText="Précédent"
						onNext={handleSubmit(onSubmit)}
						errors={Object.keys(errors).length > 0 ? true : false}
						nextBtnTextStyle={{ color: theme.colors.primary }}
					>
						<View style={{ alignItems: 'center', marginBottom:20 }}>
							<InventoryFormStep1
								control={control}
								errors={errors}
								setValue={setValue}
							/>
						</View>
					</ProgressStep>
					{/* Fin étape numéro 1 */}

					{/* Début étape numéro 2 */}
					<ProgressStep
						label="Équipements"
						previousBtnText="Précédent"
						nextBtnText="Suivant"
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
						onNext={handleSubmit(onSubmit)}
						errors={Object.keys(errors).length > 0 ? true : false}
					>
						<View style={{ alignItems: 'center' }}>
							<InventoryFormStep2
								control={control}
								errors={errors}
								setValue={setValue}
								setStuffs={setStuffs}
								stuffs={stuffs}
								heatingTypes={heatingTypes}
								setHeatingTypes={setHeatingTypes}
								hotWaterTypes={hotWaterTypes}
								setHotWaterTypes={setHotWaterTypes}
							/>
						</View>
					</ProgressStep>
					{/* Fin étape numéro 2 */}

					{/* Début étape numéro 3 */}
					<ProgressStep
						label="Relevés"
						previousBtnText="Précédent"
						nextBtnText="Suivant"
						onNext={handleSubmit(onSubmit)}
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
					>
						<View style={{ alignItems: 'center' }}>
							<InventoryFormStep3
								control={control}
								errors={errors}
								setValue={setValue}
								electricMeter={electricMeter}
								setElectricMeter={setElectricMeter}
								gazMeter={gazMeter}
								setGazMeter={setGazMeter}
								waterMeter={waterMeter}
								setWaterMeter={setWaterMeter}
							/>
						</View>
					</ProgressStep>
					{/* Fin étape numéro 3 */}

					{/* Début étape numéro 4 */}
					<ProgressStep
						label="États"
						previousBtnText="Précédent"
						finishBtnText="Finaliser"
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
						onSubmit={handleSubmit(onFinish)}
					>
						<View style={{ alignItems: 'center' }}>
							<InventoryFormStep4
								control={control}
								errors={errors}
								setValue={setValue}
								roomsDetails={roomsDetails}
								setRoomsDetails={setRoomsDetails}
							/>
						</View>
					</ProgressStep>
					{/* Fin étape numéro 4 */}
				</ProgressSteps>
				{/* Fin des étapes */}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		paddingTop: 30,
		alignItems: 'center',
	},
	logo: {
		height: 200,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		marginBottom: 20,
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
})
