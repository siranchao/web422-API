const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOption = {}
jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOption.secretOrKey = process.env.JWT_SECRET

const strategy = new JwtStrategy(jwtOption, (jwt_payload, next) => {
    console.log('payload received', jwt_payload)

    if (jwt_payload) {
        next(null, {
            id: jwt_payload.id,
        })
    }
    else {
        next(null, false)
    }
})

module.exports = { strategy }