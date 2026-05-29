const bcrypt = require('bcryptjs')

async function hashPassword(pass) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(pass, salt)
}

module.exports = hashPassword
