const createAppointment = async (data, token) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/appointment`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
			body: JSON.stringify(data),
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

const updateAppointment = async (appointmentId, data, token) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/appointment/${appointmentId}`, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `bearer ${token}`,
			},
			body: JSON.stringify(data),
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

const getAllAppointments = async (userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/appointment/getAllForAnAgent`, {
			method: 'GET',
			headers: { Authorization: 'bearer ' + userToken },
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

const getOneAppointment = async (_id, userToken) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/appointment/${_id}`, {
			method: 'GET',
			headers: { Authorization: 'bearer ' + userToken },
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

const deleteAppointment = async (userToken, appointmentId) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/appointment/${appointmentId}`, {
			method: 'DELETE',
			headers: { Authorization: 'bearer ' + userToken },
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

export {
	createAppointment,
	updateAppointment,
	getAllAppointments,
	getOneAppointment,
	deleteAppointment,
}
