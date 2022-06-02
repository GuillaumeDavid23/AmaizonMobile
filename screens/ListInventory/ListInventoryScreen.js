import * as React from 'react'
import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { getAllInventory } from '../../services/Inventory'
import CustomCard from './components/CustomCard'
import logo from '../../assets/images/logoFull.png'


export default function ListInventory({ navigation }) {
	const user = useSelector((state) => state.user.auth)
	const [allInventories, setAllInventories] = React.useState([])

    React.useLayoutEffect(() => {
		getAllInventory(user.token).then((response) => {
			const allDatas = response.inventories
			setAllInventories(allDatas)
		})
	}, [])
	return (
		<View style={styles.container}>
			<Image style={styles.fullLogo} source={logo} />
			{/* <Text style={styles.title}>Liste des propriétés</Text> */}
			<FlatList
				data={allInventories}
				keyExtractor={(item) => item._id}
				renderItem={(item) => {
					const { item: inventory } = item
					return <CustomCard inventory={inventory} />
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
