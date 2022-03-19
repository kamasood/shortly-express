const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  // access req.cookies
  // lookup user data related to session
  // assign object to req.session with relevant user information

  // req.cookies empty => generate session with new hash and store in database
  // use hash to set a cookie in the response headers (see Learn)

  if (!req.cookies.shortlyid) {
    return models.Sessions.create()
      .then((results) => {
        let id = results.insertId;
        return models.Sessions.get({ id });
      })
      .then((session) => {
        console.log(session); // should we iterate over this, or just assign it??
        req.session = session.hash;
        res.cookie('shortlyid', session.hash).end();
      });
  }

  // if req.cookies => verify cookie is valid (session stored in database)

  // if not req.cookies not valid, do something...

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

