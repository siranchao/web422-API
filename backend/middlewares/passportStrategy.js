const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOption = {}
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOption.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOption, (jwt, next) => {
    console.log('payload received', jwt)

    if (jwt) {
        next(null, {
            id: jwt.id,
        })
    }
    else {
        next(null, false)
    }
})

module.exports = { strategy }