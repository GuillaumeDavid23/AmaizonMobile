import * as React from 'react'
import { Text, View, Animated } from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ContactStyles as styles } from '../styles/ContactStyles'
import CustomButton from '../../../components/CustomButtonIcon'
import ItemDialog from './ItemDialog'

const ContactListItem = ({ data, navigation, index }) => {
	const [visible, setVisible] = React.useState(false)
	const fadeAnim = React.useRef(new Animated.Value(400)).current 

	const showDialog = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 800,
			useNativeDriver: true
		}).start(setVisible(true))
	}

	const hideDialog = () => {
		Animated.timing(fadeAnim, {
			toValue: -400,
			duration: 800,
			useNativeDriver: true,
		}).start(() => {setVisible(false)})
		
	}

	const theme = useTheme()
	return (
		<View>
			<TouchableOpacity
				style={{ width: '100%' }}
				activeOpacity={0.8}
				onPress={showDialog}
			>
				<View
					style={{
						...styles.listItem,
						backgroundColor: theme.colors.primary,
					}}
				>
					<View style={styles.listIcon}>
						<Icon name="user" size={25} color="white" />
					</View>
					<View style={styles.listBoxInfos}>
						<Text style={{ ...styles.listContact }}>
							{data.firstname} {data.lastname}
						</Text>
						<Icon name="eye" size={25} color="white" />
					</View>
				</View>
			</TouchableOpacity>
			<ItemDialog
				visible={visible}
				hideDialog={hideDialog}
				data={data}
				navigation={navigation}
				index={index}
				anime={fadeAnim}
			/>
		</View>
	)
}

export default ContactListItem
