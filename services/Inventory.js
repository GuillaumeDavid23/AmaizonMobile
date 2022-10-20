const createInventory = async (data, userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/inventory`, {
			method: 'POST',
			headers: {
				// Accept: 'multipart/form-data',
				'Content-Type': 'application/json',
				Authorization: 'bearer ' + userToken,
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				response.json().then((final) => {
					// If response 2xx
					if (!final.errors) {
						// Returning User info
						return resolve(final)
					}
					// Else: Returning Error info
					return reject(final)
				})
			})
			.catch((err) => {
				console.log(err);
				// Handling Fetch problems
				return reject({
					message: "L'API ne semble pas être disponible",
				})
			})
	})
}

const getAllInventory = async (userToken) => {
	return fetch(`${process.env.API_URL}api/inventory`, {
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

export { createInventory, getAllInventory }
