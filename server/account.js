const register = (username, password) => {
  // tutaj tworzymy nowe konto
}

const login = (username, password) => {
  if (username === 'admin' && password === '1234') {
    return 'tajne';
  }
  return false;
}

const authenticate = (sessionID) => (sessionID === 'tajne') ? true : false;

module.exports = { login, register, authenticate }
