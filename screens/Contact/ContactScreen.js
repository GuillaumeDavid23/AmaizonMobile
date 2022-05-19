import * as React from 'react'
import { Text, View, FlatList } from 'react-native'
import { useSelector} from 'react-redux'
import ContactListItem from './components/ContactListItem'
import { ContactStyles as styles } from './styles/ContactStyles'
import { FAB } from 'react-native-paper'
import CustomFAB from '../../components/CustomFAB'
import { TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useForm, Controller } from 'react-hook-form'
import validate from '../../utils/validation'
export default function ContactScreen({ navigation }) {
		const {
			control,
			handleSubmit,
			formState: { errors },
			setValue,
		} = useForm({
			defaultValues: {
				search: "",
			},
			mode: 'onChange',
			shouldFocusError: true,
		})
	const user = useSelector((state) => state.user.auth.data)
	const [listCustomer, setListCustomer] = React.useState([])
	React.useLayoutEffect(() => {
		setListCustomer(user.agent.customers)
	})

	const onSubmit = (data) => {
		if (data.search === "") {
			setListCustomer(user.agent.customers)
			return
		}
		
		setListCustomer(user.agent.customers.filter((item) => {
				return item.firstname.includes(data.search)
			})
		)
		
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Carnet de contact</Text>
			</View>
			<View>
				<View
					style={{
						width: 250,
						marginBottom: 30,
						alignSelf: 'center',
					}}
				>
					<Controller
						control={control}
						rules={{
							...validate.userName,
							required: { value: false },
						}}
						name="search"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Rechercher"
								onBlur={onBlur}
								onChangeText={onChange}
								autoComplete="search"
								value={value}
								error={errors?.search}
								style={{
									width: '100%',
								}}
								right={
									<TextInput.Icon
										name={() => (
											<Icon
												name="search"
												size={20}
												color="#5D5D5D"
											/>
										)} // where <Icon /> is any component from vector-icons or anything else
										onPress={handleSubmit(onSubmit)}
									/>
								}
							/>
						)}
					/>
				</View>
				<FlatList
					data={listCustomer}
					keyExtractor={(customer) => customer._id}
					renderItem={(customer) => {
						const { item, index } = customer

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
				<CustomFAB
					onPress={() => {
						navigation.navigate('CreateClient')
					}}
				/>
			</View>
		</View>
	)
}


