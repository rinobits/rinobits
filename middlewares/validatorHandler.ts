

const validate = (data: any, schema: any) => {
    return schema.validate(data)
}
const setValues = (values: any, data: any, req: any, next: any) => {
    req[data] = values
    next()
}
const validatorHandler = (schema: any, data: any) => {
    const boom = require('@hapi/boom')
    return (req: any, res: any, next: any) => {
        const response = validate(req[data], schema)
        if (response.error) {
            response.error = boom.badRequest(response.error)
            next(response.error)
        }
        else {
            setValues(response.value, data, req, next)
        }
    }
}
module.exports = validatorHandler

