const jwt = require("jsonwebtoken");

module.exports = {
  async generateJWT (payload) {
    const jwtToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return jwtToken;
  }
}
