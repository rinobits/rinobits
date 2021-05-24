// packages
const jwt  = require('jsonwebtoken')
const boom = require('@hapi/boom')
// imports & conts
const {config:{authJwtSecret}}  = require('../config')

module.exports = (req: any, res: any, next: any) => {
    const bearerToken = req.headers['authorization']
    if(bearerToken != undefined){ 
        req.token = bearerToken
        jwt.verify(req.token, authJwtSecret, (e: any) => {
            if(e){
                e = boom.unauthorized(e)
                next(e)
            }else{
                next()
            }
        })
    }else{
        let e = boom.unauthorized('Unauthorized')
        next(e.output.payload)
    }
}
