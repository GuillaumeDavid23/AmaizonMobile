import * as React from 'react'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import { API_URL } from '@env'
const CustomCard = (props) => {
    const {property} = props
	return (
		<Card style={{ marginBottom: 30 }}>
			<Card.Title title={property.title} />
			<Card.Cover
				source={{ uri: API_URL + property?.imageUrl?.photo1 }}
			/>
			<Card.Content>
				<Paragraph>{property.description}</Paragraph>
			</Card.Content>
		</Card>
	)
}

export default CustomCard
