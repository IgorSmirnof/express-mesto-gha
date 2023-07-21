// https://stackoverflow.com/questions/40251930/matching-regular-expression-for-urls-in-javascript-produces-null
const URL_REXP = /^(https?:\/\/)?([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i;

module.exports = URL_REXP;
