class NotFindPage extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};
// module.exports = new NotFindPage('Not Find Page')
module.exports = new NotFindPage()