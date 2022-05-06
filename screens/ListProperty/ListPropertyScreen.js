import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProperties } from '../../services/Property'
import CustomCard from './components/CustomCard'

export default function ListProperty({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	const [allProperties, setAllProperties] = React.useState([])

    React.useLayoutEffect(() => {
		getAllProperties().then((response) => {
			const allDatas = response.properties
			setAllProperties(allDatas)
		})
	}, [])
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Liste des propriété</Text>
			<FlatList
				data={allProperties}
				keyExtractor={(item) => item._id}
				renderItem={(item) => {
					const { item:property } = item
					return <CustomCard property={property}/>
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
		paddingTop: 50,
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
})
