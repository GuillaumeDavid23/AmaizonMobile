import * as React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { getAllProperties, searchProperties } from '../../services/Property'
import CustomCard from './components/CustomCard'
import logo from '../../assets/images/logoFull.png'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
export default function ListProperty({ navigation }) {
	const user = useSelector((state) => state.user.auth)
	const [allProperties, setAllProperties] = React.useState([])
	const [filteredProperties, setFilteredProperties] = React.useState([])
	const [search, setSearch] = React.useState('')

	React.useLayoutEffect(() => {
		getAllProperties(user.token)
			.then((response) => {
				if (response) {
					const allDatas = response.properties
					setAllProperties(allDatas)
				} else {
					console.error(response)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])
	const handleSearch = () => {
		searchProperties({
			search: search,
			transactionType: '',
			propertyType: '',
			location: '',
			minPrice: '',
			maxPrice: '',
			roomNumberMin: '',
			roomNumberMax: '',
			surfaceMin: '',
			surfaceMax: '',
			isToSell: 'agent',
		}).then((response) => {
			setFilteredProperties(response.data)
		})
	}
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			<Text style={styles.title}>Liste des propriétés</Text>
			<TextInput
				mode="outlined"
				label="Référence ou titre de la propriété"
				right={
					<TextInput.Icon
						name={() => (
							<Icon name="search" size={20} color="#5D5D5D" />
						)}
						onPress={handleSearch}
					/>
				}
				onChangeText={(value) => {
					setSearch(value)
				}}
				value={search}
				style={{
					width: '90%',
					alignSelf: 'center',
					height: 50,
				}}
			/>
			<FlatList
				data={filteredProperties.length > 0 ? filteredProperties : allProperties}
				keyExtractor={(item) => item._id}
				renderItem={(item) => {
					const { item: property } = item
					return <CustomCard property={property} />
				}}
				style={styles.list}
			/>
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
	},
	list: {
		width: '100%',
	},
	fullLogo: {
		height: 50,
		resizeMode: 'contain',
	},
})
