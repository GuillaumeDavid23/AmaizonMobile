import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Title, useTheme } from 'react-native-paper'
import logo from '../../assets/images/logoFull.png'
import InventoryFormStep1 from './components/InventoryFormStep1'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useForm } from 'react-hook-form'
import InventoryFormStep2 from './components/InventoryFormStep2'
import moment from 'moment'
import InventoryFormStep3 from './components/InventoryFormStep3'

export default function InventoryScreen({ navigation }) {
	const theme = useTheme()
	//Création du formulaire
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			PropertyRef: 'APT4585',
			ClientRef: 'CL1223E',
			OldClientRef: 'CL1245E',
			dateStart: moment(new Date()).format('YYYY-MM-DD'),
			inOut: false,
			keyNumber: '2',
			lst_equipement: [],
			lst_heater: [],
			lst_hotWater: [],
			lst_statsMeters: [],
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
		ref: '',
		value: '',
	})
	const [gazMeter, setGazMeter] = React.useState({
		name: 'gaz',
		ref: '',
		value: '',
	})
	const [waterMeter, setWaterMeter] = React.useState({
		name: 'water',
		ref: '',
		value: '',
	})

	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		data.lst_statsMeters = [electricMeter, gazMeter, waterMeter]
		console.log(data)
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
						<View style={{ alignItems: 'center' }}>
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
						label="Etape 3"
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
						label="Etape 4"
						previousBtnText="Précédent"
						finishBtnText="Terminer"
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
					>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 4!</Text>
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
