// React imports
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// HookForm imports
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

// Store imports:
import { createSeller, getClient } from '../../services/Contact'
import { createProperty } from '../../services/Property'

// Pages imports:
import Pages from './components/Pages'

// Design imports
import { Button, ProgressBar, Colors } from 'react-native-paper'
import CustomSnackBar from '../../components/CustomSnackBar'

export default function AddProperty({ navigation }) {
	// Récupération du token:
	const token = useSelector((state) => state.user.auth.token)

	// SnackBar states
	const [isSnackVisible, setIsSnackVisible] = useState(false)
	const [snackText, setSnackText] = useState('')

	// Gestion de la pagination:
	const [visiblePage, setVisiblePage] = useState(1)
	const [progress, setProgress] = useState(0)
	const handleNavigation = (previousOrNext) => {
		let newVisiblePage = visiblePage
		if (previousOrNext === 'previous') {
			newVisiblePage--
		} else if (previousOrNext === 'next') {
			// On check si des erreurs on été générés sur la page actuelle et dans ce cas, on bloque l'accès à la page suivante.
			if (
				(visiblePage === 1 &&
					!(
						errors.title ||
						errors.propertyType ||
						errors.description
					)) ||
				(visiblePage === 2 &&
					!(
						errors.location ||
						errors.postalCode ||
						errors.city ||
						errors.country
					)) ||
				(visiblePage === 3 &&
					!(
						errors.surface ||
						errors.roomNumber ||
						errors.electricMeterRef ||
						errors.gasMeterRef
					)) ||
				(visiblePage === 4 &&
					!(
						errors.list_equipments ||
						errors.heatingType ||
						errors.hotWaterType
					)) ||
				(visiblePage === 5 &&
					!(
						errors.transactionType ||
						errors.amount ||
						errors.isToSell
					)) ||
				(visiblePage === 6 && checked) ||
				visiblePage === 7
			) {
				newVisiblePage++
			}
		}
		setVisiblePage(newVisiblePage)
		switch (newVisiblePage) {
			case 1:
				setProgress(0)
				break
			case 2:
				setProgress(0.15)
				break
			case 3:
				setProgress(0.3)
				break
			case 4:
				setProgress(0.45)
				break
			case 5:
				setProgress(0.6)
				break
			case 6:
				setProgress(0.75)
				break
			case 7:
				setProgress(0.9)
				break
			case 8:
				setProgress(1)
				break
			default:
		}
	}

	// Destructuring HookForm hook
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		shouldFocusError: true,
		defaultValues: {
			title: 'Chouette Maison',
			location: "441 rue d'abbeville",
			postalCode: '80000',
			city: 'Amiens',
			country: 'France',
			surface: '250',
			roomNumber: '5',
			amount: '200000',
		},
	})

	// Gestion de l'affichage des erreurs:
	if (Object.keys(errors).length > 0 && visiblePage === 7) {
		if (errors.title || errors.propertyType || errors.description) {
			setVisiblePage(1)
		} else if (
			errors.location ||
			errors.postalCode ||
			errors.city ||
			errors.country
		) {
			setVisiblePage(2)
		} else if (
			errors.surface ||
			errors.roomNumber ||
			errors.electricMeterRef ||
			errors.gasMeterRef
		) {
			setVisiblePage(3)
		} else if (
			errors.list_equipments ||
			errors.heatingType ||
			errors.hotWaterType
		) {
			setVisiblePage(4)
		} else if (errors.transactionType || errors.amount || errors.isToSell) {
			setVisiblePage(5)
		} else if (errors.transactionType || errors.amount || errors.isToSell) {
			setVisiblePage(5)
		} else if (!checked) {
			setVisiblePage(6)
		}
	}

	// Récupération du client:
	const [checked, setChecked] = useState()
	const [seller, setSeller] = useState({})
	useEffect(() => {
		if (checked) {
			try {
				getClient(checked, token).then((res) => {
					setSeller(res.data)
				})
			} catch (error) {
				console.log(error)
			}
		}
	}, [checked])

	// Gestion des uploads Photos:
	const [photosList, setPhotosList] = useState({
		photo1: {},
		photo2: {},
		photo3: {},
		photo4: {},
		photo5: {},
	})

	// Gestion de la pré-validation:
	const [datasToDisplay, setDatasToDisplay] = useState([])
	const [datasToValidate, setDatasToValidate] = useState([])
	const onSubmit = (data) => {
		// Hotfix isToSell:
		if (data.isToSell === undefined) {
			data.isToSell = true
		}

		// Temporaire, inclusion de propertyRef dans les datas:
		data['propertyRef'] = 'RDF5613325'

		// Récupération des valeurs dans le select list_equipments:
		if (data.list_equipments !== undefined) {
			let formattedSuffList = []
			data.list_equipments.selectedList.forEach((value) => {
				formattedSuffList.push(value.value)
			})
			data.list_equipments = formattedSuffList
		}

		// Récupération des valeurs dans les select propertyType et transactionType:
		data.propertyType = data.propertyType.selectedList[0].value
		data.transactionType = data.transactionType.selectedList[0].value

		// Formattage et unification des datas de chauffage:
		if (data.heatingType !== undefined || data.hotWaterType !== undefined) {
			let list_heater = []
			if (data.heatingType !== undefined) {
				list_heater.push(
					'Chauffage ' + data.heatingType.selectedList[0].value
				)
				delete data.heatingType
			}
			if (data.heatingType !== undefined) {
				list_heater.push(
					'Eau chaude ' + data.hotWaterType.selectedList[0].value
				)
				delete data.hotWaterType
			}
			data['list_heater'] = list_heater
		}

		// Formattage de l'adresse:
		data.location = [
			data.location,
			data.postalCode,
			data.city,
			data.country,
		]
		delete data.postalCode
		delete data.city
		delete data.country

		// Génération du formData:
		var formData = new FormData()
		// Traitement des datas (retrait des undefined):
		for (const key in data) {
			if (data[key] !== undefined) {
				formData.append(key, data[key])
			}
		}
		for (const key in photosList) {
			formData.append(key, photosList[key])
		}

		// Formattage des datas to display
		let datasToDisplayToState = {}
		for (var pair of formData.entries()) {
			datasToDisplayToState[pair[0]] = pair[1]
		}
		setDatasToDisplay(datasToDisplayToState)

		setDatasToValidate(formData)
		handleNavigation('next')
	}

	// Gestion de la validation:
	const handleValidation = (data) => {
		createProperty(data, token)
			// On Promise Successful
			.then((res) => {
				if (res !== undefined) {
					createSeller(checked, res.datas, token)
						.then((res2) => {
							if (res2 !== undefined) {
								navigation.navigate('TabNavHome')
							} else {
								setSnackText('Erreur Serveur !')
								setIsSnackVisible(true)
							}
						})
						.catch(async (err) => {
							await err
							console.log('err2:', err)
						})
				} else {
					setSnackText('Erreur Serveur !')
					setIsSnackVisible(true)
				}
			})
			// On Promise Reject
			.catch(async (err) => {
				await err
				if (err._W) {
					err = err._W
				}
				// Handling rejected Promise
				if (typeof err === 'object') {
					let { message } = err
					// Handling Validation error:
					if (err.status_code === 422) {
						err.errors.forEach((error) => {
							Object.keys(error).forEach((key) => {
								message += '\n-' + error[key]
							})
						})
						setSnackText(message)
					} else {
						// Handling Classic error:
						setSnackText(message)
					}
				} else {
					setSnackText(err)
				}

				setIsSnackVisible(true)
			})
	}

	return (
		<View style={styles.container}>
			<View>
				<Text style={{ fontSize: 30, marginTop: 10 }}>
					Ajouter une propriété:
				</Text>
				<ProgressBar
					progress={progress}
					color={Colors.blue800}
					style={{ width: 300 }}
				/>
			</View>

			<Pages
				visiblePage={visiblePage}
				control={control}
				errors={errors}
				token={token}
				checked={checked}
				setChecked={setChecked}
				photosList={photosList}
				setPhotosList={setPhotosList}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				datasToDisplay={datasToDisplay}
				seller={seller}
				datasToValidate={datasToValidate}
				handleValidation={handleValidation}
			/>

			{/* Bouttons de navigation */}
			<View style={{ flexDirection: 'row', marginVertical: 10 }}>
				{visiblePage > 1 && visiblePage !== 8 && (
					<Button
						icon="arrow-left"
						mode="contained"
						compact
						labelStyle={{ fontSize: 12 }}
						onPress={() => handleNavigation('previous')}
						style={{ marginHorizontal: 10 }}
					>
						Précedent
					</Button>
				)}
				{visiblePage < 7 && (
					<Button
						icon="arrow-right"
						mode="contained"
						compact
						labelStyle={{ fontSize: 12 }}
						onPress={() => handleNavigation('next')}
						style={{ marginHorizontal: 10 }}
						reversed
					>
						Suivant
					</Button>
				)}
			</View>

			{/* SnackBar */}
			<CustomSnackBar
				visible={isSnackVisible}
				setVisible={setIsSnackVisible}
				type="error"
				title="Erreur"
				text={snackText}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ECE6DE',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		width: 250,
		height: 100,
		resizeMode: 'contain',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
	},
})
