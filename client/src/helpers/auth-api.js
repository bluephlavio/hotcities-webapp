const login = (user) => {
	return fetch('auth/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(user)
		})
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
}

const logout = () => {
	return fetch('auth/logout', {
			method: 'GET',
		})
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
}

export default {
	login,
	logout,
}