var dbConnection = require('../GlobalConfig/firebaseConfig');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(dbConnection),
  databaseURL: "RTDBURL"
});

module.exports = admin;