const parseCookies = (req, res, next) => {

  // access incoming request cookies (string)
  // parse (many) cookies into an object
  // assign object to req.cookies

  if (req.headers.cookie) {
    let cookiesObject = {};
    req.headers.cookie.split('; ').forEach((cookie) => {
      cookiesObject[cookie.split('=')[0]] = cookie.split('=')[1];
    });
    req.cookies = cookiesObject;
  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;