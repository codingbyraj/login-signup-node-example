const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {User} = require('./db')

passport.serializeUser((user, done) => {
    console.log("ser called")
    if (user && user.id) {
        return done(null, user.id)
    }
    done(new Error("User or User ID not found"))
})

passport.deserializeUser((userId, done) => {
    console.log("de-ser called")
    User.findOne({
        where: {id: userId}
    }).then((user) => {
        if (user) {
            done(null, user)
        } else {
            done (new Error("No such user found"))
        }
    }).catch((err) => done(err))
})

passport.use(new LocalStrategy((id, password, done) => {
    console.log("local strategy called")
    User.findOne({
        where: {id: id}
    }).then((user) => {
        if (!user) {
            return done(null, false, {message: 'Username does not exist'})
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Password is wrong' })
        }  
        // setSession(id);
        done(null, user)

    }).catch((err) => done(err))

}))

module.exports = passport