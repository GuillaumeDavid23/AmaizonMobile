import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, Switch } from 'react-native-paper'
import { Text, View } from 'react-native'
import { PaperSelect } from 'react-native-paper-select'
import { REGSTRING, REGNUM, REGID } from '../../../utils/regex'

const Page5 = ({ display, control, errors }) => {
	// Déclaration options selects transactionTypes:
	const [transactionTypes, setTransactionTypes] = useState({
		value: '',
		list: [
			{ _id: 1, value: 'Achat' },
			{ _id: 2, value: 'Location' },
		],
		selectedList: [],
		error: '',
	})

	return (
		<View style={{ display, width: 300 }}>
			<Text style={{ fontSize: 25, textAlign: 'center' }}>
				Infos financières:
			</Text>
			<View>
				{/* TransactionType Form part */}
				<View
					style={{
						marginVertical: 20,
					}}
				>
					<Controller
						style={{ alignItems: 'center' }}
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Type de transaction requis.',
							},
							pattern: {
								value: REGSTRING.value,
								message: REGSTRING.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<PaperSelect
								label="Type de transaction"
								value={transactionTypes.value}
								onSelection={onChange}
								arrayList={[...transactionTypes.list]}
								selectedArrayList={
									transactionTypes.selectedList
								}
								errorText={transactionTypes.error}
								multiEnable={false}
								checkboxLabelStyle={{
									color: 'black',
									fontWeight: '700',
								}}
							/>
						)}
						name="transactionType"
					/>
					{/* TransactionType Form show-error part */}
					{errors?.transactionType && (
						<Text style={{ color: 'red' }}>
							{errors.transactionType.message}
						</Text>
					)}
				</View>
				{/* Amount Form part */}
				<View style={{ marginVertical: 20, alignItems: 'center' }}>
					<Controller
						control={control}
						rules={{
							required: {
								value: true,
								message: 'Montant requis.',
							},
							pattern: {
								value: REGNUM.value,
								message: REGNUM.message,
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								mode="outlined"
								label="Montant"
								keyboardType="numeric"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								error={errors?.description}
								style={{ width: 300 }}
							/>
						)}
						name="amount"
					/>
					{/* Amount Form show-error part */}
					{errors?.amount && (
						<Text style={{ color: 'red' }}>
							{errors.amount.message}
						</Text>
					)}
				</View>
			</View>
			{/* IsToSell Form part */}
			<View style={{ marginVertical: 20 }}>
				<Text>Cette propriété est à vendre/louer dès maintenant:</Text>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text>Non</Text>
					<Controller
						control={control}
						rules={{
							pattern: {
								value: REGID.value,
								message: REGID.message,
							},
						}}
						render={({
							field: { onChange, onBlur, value = true },
						}) => <Switch value={value} onValueChange={onChange} />}
						name="isToSell"
					/>
					<Text>Oui</Text>
				</View>
				{/* IsToSell Form show-error part */}
				{errors?.isToSell && (
					<Text style={{ color: 'red' }}>
						{errors.isToSell.message}
					</Text>
				)}
			</View>
		</View>
	)
}

export default Page5
