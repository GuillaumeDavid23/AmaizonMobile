import { API_URL } from '@env'

const getClient = async (id, token) => {
	return fetch(`${API_URL}api/user/${id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`,
		},
	})
		.then((response) => {
				return response.json()
		})
		.catch((errors) => console.log(errors))
}

const updateClient = async (id, token, data) => {
	return fetch(`${API_URL}api/user/${id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

const createClient = async (token, data) => {
	return fetch(`${API_URL}api/user`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `bearer ${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

export { getClient, updateClient, createClient }
