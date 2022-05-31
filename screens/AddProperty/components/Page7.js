import { Text, View } from 'react-native'
import CustomButton from '../../../components/CustomButtonIcon'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as DocumentPicker from 'expo-document-picker'

const Page7 = ({
	display,
	photosList,
	setPhotosList,
	handleSubmit,
	onSubmit,
}) => {
	const handlePhotos = async (photoNumber) => {
		let result = await DocumentPicker.getDocumentAsync()
		let photosListToState = photosList
		switch (photoNumber) {
			case 1:
				photosListToState.photo1 = result.file
				break
			case 2:
				photosListToState.photo2 = result.file
				break
			case 3:
				photosListToState.photo3 = result.file
				break
			case 4:
				photosListToState.photo4 = result.file
				break
			case 5:
				photosListToState.photo5 = result.file
				break
			default:
		}
		setPhotosList(photosList)
	}

	return (
		<View style={{ display }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Ajout de photos:
			</Text>

			<View>
				<View style={{ marginVertical: 20 }}>
					<CustomButton
						style={{ width: '90%' }}
						text="Photo 1"
						CustomIcon={(size, color) => (
							<Icon size={size} name="camera" color={color} />
						)}
						onPress={() => handlePhotos(1)}
					/>
					{photosList.photo1.name !== null && (
						<Text>{photosList.photo1.name}</Text>
					)}
				</View>
				<View style={{ marginVertical: 20 }}>
					<CustomButton
						style={{ width: '90%' }}
						text="Photo 2"
						CustomIcon={(size, color) => (
							<Icon size={size} name="camera" color={color} />
						)}
						onPress={() => handlePhotos(2)}
					/>
					{photosList.photo2.name !== null && (
						<Text>{photosList.photo2.name}</Text>
					)}
				</View>
				<View style={{ marginVertical: 20 }}>
					<CustomButton
						style={{ width: '90%' }}
						text="Photo 3"
						CustomIcon={(size, color) => (
							<Icon size={size} name="camera" color={color} />
						)}
						onPress={() => handlePhotos(3)}
					/>
					{photosList.photo3.name !== null && (
						<Text>{photosList.photo3.name}</Text>
					)}
				</View>
				<View style={{ marginVertical: 20 }}>
					<CustomButton
						style={{ width: '90%' }}
						text="Photo 4"
						CustomIcon={(size, color) => (
							<Icon size={size} name="camera" color={color} />
						)}
						onPress={() => handlePhotos(4)}
					/>
					{photosList.photo4.name !== null && (
						<Text>{photosList.photo4.name}</Text>
					)}
				</View>
				<View style={{ marginVertical: 20 }}>
					<CustomButton
						style={{ width: '90%' }}
						text="Photo 5"
						CustomIcon={(size, color) => (
							<Icon size={size} name="camera" color={color} />
						)}
						onPress={() => handlePhotos(5)}
					/>
					{photosList.photo5.name !== null && (
						<Text>{photosList.photo5.name}</Text>
					)}
				</View>
			</View>

			{/* Submit Button */}
			<CustomButton
				style={{ marginTop: 20 }}
				text="Ajouter"
				CustomIcon={(size, color) => (
					<Icon size={size} name="arrow-right" color={color} />
				)}
				onPress={handleSubmit(onSubmit)}
				reversed
			/>
		</View>
	)
}

export default Page7
