import { API_URL } from '@env'

const getAllProperties = async () => {
	return fetch(`${API_URL}api/property`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

export { getAllProperties }
