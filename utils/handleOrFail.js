class handleOrFail extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

// function handleOrFail(title) {
//   handleOrFail.message = title;
//   handleOrFail.statusCode = 404;
//   console.log(handleOrFail);
// }

module.exports = handleOrFail;
