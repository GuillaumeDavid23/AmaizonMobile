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
			if (response.ok) {
				return response.json()
			}
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

const searchClient = async (token, lastname) => {
	return fetch(`${API_URL}api/user/searchClient/${lastname}`, {
		method: 'GET',
		headers: { Authorization: `bearer ${token}` },
	})
		.then((response) => {
			if (response.ok) {
				return response.json()
			}
		})
		.catch((errors) => console.log(errors))
}

const createSeller = async (userId, propertyId, token) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${API_URL}api/user/createSeller/${userId}/${propertyId}`, {
			method: 'PUT',
			headers: { Authorization: `bearer ${token}` },
		})
			.then((response) => {
				// If response 2xx
				if (response.ok) {
					// Returning User info
					return resolve(response.json())
				}
				// Else: Returning Error info
				return reject(response.json())
			})
			.catch((err) => {
				// Handling Fetch problems
				return reject({
					message: "L'API ne semble pas être disponible",
				})
			})
	})
}

export { getClient, updateClient, createClient, searchClient, createSeller }
