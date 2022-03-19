const models = require('../models');
const Promise = require('bluebird');

module.exports.parseCookies = require('./cookieParser.js');

module.exports.createSession = (req, res, next) => {

  // access req.cookies
  // lookup user data related to session
  // assign object to req.session with relevant user information

  // if there are no cookies on the request
  // initialize a new session (Sessions.create, Sessions.get & req.session)
  // set a new cookie on the response 'shortlyid'
  if (!req.cookies.shortlyid) {
    return models.Sessions.create()
      .catch((error) => {
        console.log(error);
      })
      .then((results) => {
        let id = results.insertId;
        return models.Sessions.get({ id });
      })
      .then((session) => {
        req.session = session;
        res.cookie('shortlyid', session.hash);
        next();
      });
    //catch do something
  }

  // if there is a cookie 'shortlyid' on request
  // lookup session & add to req.session
  // if no session at lookup, create new session and reassign res.cookies
  if (req.cookies.shortlyid) {
    return models.Sessions.get({ hash: req.cookies.shortlyid })
      .then((session) => {
        if (!session) {
          return models.Sessions.create();
        } else {
          req.session = session;
          next();
        }
      })
      .then((results) => {
        let id = results.insertId;
        return models.Sessions.get({ id });
      })
      .then((session) => {
        req.session = session;
        res.cookie('shortlyid', session.hash);
        next();
      });
    //catch do something
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

