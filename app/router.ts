// packages
const express = require('express');

// imports & consts 
const user = require('./user/routes')
const auth = require('./user/auth/routes')
const index = (app: any) => {
    const router = express.Router()
    app.use('/api', router)
    router.use('/user/validate', auth)
    router.use('/user', user)
}
module.exports = index