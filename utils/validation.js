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
	number: {
		required: {
			value: false,
			message: 'Champ téléphone requis',
		},
		pattern: {
			value: /^[\d]*$/i,
			message: 'Entrer un nombre valide',
		},
	},
	alphaNumeric: {
		required: {
			value: true,
			message: 'Champ requis',
		},
		pattern: {
			value: /^[a-zA-Z\u00C0-\u00FF'0-9]*$/i,
			message: 'Entrer un nom/prénom valide',
		},
	},
	required: {
		required: {
			value: true,
			message: 'Champ requis',
		},
	},
	propertyRef: {
		required: {
			value: true,
			message: 'Champ requis',
		},
		pattern: {
			value: /^[a-zA-Z\u00C0-\u00FF'0-9]*$/i,
			message: 'Entrer une référence valide',
		},
		maxLength: {
			value: 10,
			message: 'La longueur doit être de 10 caractères',
		},
		minLength: {
			value: 10,
			message: 'La longueur doit être de 10 caractères',
		},
	},
}

export default validate
