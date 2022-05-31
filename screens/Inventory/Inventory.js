import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Title, useTheme } from 'react-native-paper'
import logo from '../../assets/images/logoFull.png'
import InventoryFormStep1 from './components/InventoryFormStep1'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { useForm, Controller } from 'react-hook-form'

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
			PropertyRef: 'TESTIII',
			ClientRef: 'TESTIII',
			dateStart: new Date(),
			inOut: false,
		},
		mode: 'onChange',
		shouldFocusError: true,
	})
	console.log()
	//ENVOIE DES DONNEES
	const onSubmit = (data) => {
		console.log(data)
	}
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			<Title>Nouvel état des lieux</Title>
			<View style={{ flex: 1, width: '100%' }}>
				<ProgressSteps
					labelColor="black"
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
					<ProgressStep
						label="Etape 1"
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
					<ProgressStep
						label="Etape 2"
						previousBtnText="Précédent"
						nextBtnText="Suivant"
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
					>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 2!</Text>
						</View>
					</ProgressStep>
					<ProgressStep
						label="Etape 3"
						previousBtnText="Précédent"
						nextBtnText="Suivant"
						nextBtnTextStyle={{ color: theme.colors.primary }}
						previousBtnTextStyle={{ color: theme.colors.primary }}
					>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 3!</Text>
						</View>
					</ProgressStep>
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
				</ProgressSteps>
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
