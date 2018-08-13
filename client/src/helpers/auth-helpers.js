const registerAuth = jwt => {
	if (typeof window !== 'undefined') {
		sessionStorage.setItem('jwt', JSON.stringify(jwt));
	}
}

const unregisterAuth = () => {
	if (typeof window !== 'undefined') {
		sessionStorage.removeItem('jwt');
	}
}

const readAuth = () => {
	if (typeof window !== 'undefined') {
		return sessionStorage.getItem('jwt');
	}
}

export default {
	registerAuth,
	unregisterAuth,
	readAuth,
}