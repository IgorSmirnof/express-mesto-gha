// const URL_REXP = /^(https?:\/\/)?[0-9a-z-_]*(\.[0-9a-z-_]+)*(\.[a-z]+)+(\/[0-9a-z-_]*)*?\/?$/im;
// --> https://regex101.com/r/VU8J9B/1

const URL_REXP = /https?:\/\/(www.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=,]*/;
module.exports = URL_REXP;
