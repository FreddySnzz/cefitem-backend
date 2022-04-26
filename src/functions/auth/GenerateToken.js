module.exports = {
  async generateNewToken(min, max) {
    let token = [];

    for( let i = 0; i < 6; i++ ){
      min = Math.ceil(min);
      max = Math.floor(max);
      token.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    token = token.join("");
    return token;
  }
}
