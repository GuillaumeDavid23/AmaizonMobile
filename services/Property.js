const getAllProperties = async () => {
	return fetch(`${process.env.API_URL}api/property`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${userToken}`,
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

const createProperty = async (data, userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/property`, {
			method: 'POST',
			headers: {
				// Accept: 'multipart/form-data',
				// 'Content-Type': 'multipart/form-data',
				Authorization: 'bearer ' + userToken,
			},
			body: data,
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

export { getAllProperties, createProperty }
