const signup = (req, res) => {
  res.send('<h1>route = /auth/signup</h1>')
}

const login = (req, res) => {
  res.send('<h1>route = /auth/login</h1>')
}

const current = (req, res) => {
  res.send('<h1>route = /auth/login</h1>')
}

const logout = (req, res) => {
  res.send('<h1>route = /auth/login</h1>')
}

export {
  signup,
  login,
  current,
  logout,
}