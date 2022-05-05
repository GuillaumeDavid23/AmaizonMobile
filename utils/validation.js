const validate = {
	userName: {
		required: {
			value: true,
			message: 'Champ requis',
		},
		pattern: {
			value: /^[a-zA-Z\u00C0-\u00FF']*$/i,
			message: 'Entrer un nom/prénom valide',
		},
	},
	email: {
		required: {
			value: true,
			message: 'Champ email requis',
		},
		pattern: {
			value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			message: 'Entrer une email valide',
		},
	},
	phone: {
		required: {
			value: true,
			message: 'Champ téléphone requis',
		},
		pattern: {
			value: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/i,
			message: 'Entrer une téléphone valide',
		},
	},
}

export default validate
