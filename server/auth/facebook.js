const passport = require('passport')
const router = require('express').Router()
const FacebookStrategy = require('passport-facebook').Strategy
const {User} = require('../db/models')
module.exports = router

if (process.env.NODE_ENV !== 'production') require('../../secrets')

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook client ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'email']
  }
  passport.use(
    new FacebookStrategy(facebookConfig, function(
      accessToken,
      refreshToken,
      profile,
      done
    ) {
      const facebookId = profile.id
      const name = profile.displayName
      const email = profile.emails[0].value
      // console.log(email, facebookId)
      User.findOrCreate({
        where: {facebookId},
        defaults: {email}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    })
  )
}

router.get('/', passport.authenticate('facebook', {scope: ['email']}))

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/home',
    failureRedirect: '/login'
  })
)
