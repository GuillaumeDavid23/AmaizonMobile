/**
 * Main Agent login function.
 *
 * @param {String} email User email
 * @param {String} password User password
 * @returns Promise with User info || Promise with Error info
 */
const doLogin = (email, password) => {
	// Returning new Promise
	return new Promise((resolve, reject) => {
		// Fetching API
		fetch(`${process.env.API_URL}api/user/loginAgent`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email: email, password: password }),
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

export default doLogin
