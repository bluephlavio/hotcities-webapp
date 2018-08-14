const login = user => fetch('auth/login', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(user),
})
  .then(res => res.json())
  .catch(err => console.log(err));

const logout = () => fetch('auth/logout', {
  method: 'GET',
})
  .then(res => res.json())
  .catch(err => console.log(err));

const registerAuth = (jwt) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
  }
};

const unregisterAuth = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('jwt');
  }
};

const readAuth = () => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('jwt');
  }
  return false;
};


export default {
  login,
  logout,
  registerAuth,
  unregisterAuth,
  readAuth,
};
