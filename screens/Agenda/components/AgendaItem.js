import { View, Text } from 'react-native'
import { FAB, Divider } from 'react-native-paper'

const AgendaItem = ({
	item,
	firstItemInDay,
	handleDeleteAppointment,
	navigation,
}) => {
	let { _id, startTime, endTime, buyer, address } = item

	return (
		<>
			{!firstItemInDay && <Divider />}
			<View
				style={{
					marginTop: firstItemInDay ? 10 : 0,
					height: 100,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					// border: 'black solid 1px',
				}}
			>
				<View style={{ width: '40%' }}>
					<Text style={{ fontWeight: 'bold' }}>
						{startTime}-{endTime}:
					</Text>
					<Text>
						{buyer.lastname} {buyer.firstname}
					</Text>
					{/* <Text style={{ overflowWrap: 'break-word' }}>{address}</Text> */}
					<Text>{address}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<FAB
						style={{ margin: 8 }}
						small
						icon="eye"
						onPress={() => console.log('see')}
					/>
					<FAB
						style={{ margin: 8 }}
						small
						icon="lead-pencil"
						onPress={() =>
							navigation.navigate('AddAppointment', { _id })
						}
					/>
					<FAB
						style={{ margin: 8, marginRight: 12 }}
						small
						icon="delete"
						onPress={() => handleDeleteAppointment(_id)}
					/>
				</View>
			</View>
		</>
	)
}

export default AgendaItem
