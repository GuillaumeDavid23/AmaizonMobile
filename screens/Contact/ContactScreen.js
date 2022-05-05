import * as React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useSelector} from 'react-redux'
import ContactListItem from './components/ContactListItem'
import { ContactStyles as styles } from './styles/ContactStyles'

export default function ContactScreen({ navigation }) {
	const user = useSelector((state) => state.user.auth.data)
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Carnet de contact</Text>
			</View>
			<View style={{ alignItems: 'center' }}>
				<FlatList
					data={user.agent.customers}
					keyExtractor={(customer) => customer._id}
					renderItem={(customer, index) => {
						const { item } = customer
						return (
							<ContactListItem
								key={index}
								data={item}
								navigation={navigation}
								index={index}
							/>
						)
					}}
					style={styles.list}
				/>
			</View>
		</View>
	)
}


