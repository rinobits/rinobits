
// packages
const Joi              = require('@hapi/joi');
// consts
const pattern          = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,32})");

// usuario
const userName         = Joi.string().min(3).max(30);
const userPassword     = Joi.string().regex(pattern).min(8).max(32);
const estado           = Joi.number().min(0).max(1);
const id               = Joi.number().min(0);

const idSchema          = Joi.object({
    id: id.required()
})
const usuarioSchemaCreate = Joi.object({
    userName: userName.required(),
    userPassword: userPassword.required(),
})

const usuarioSchemaUpdate = Joi.object({
    userName,
    userPassword,
    estado
});
const usuarioSchemaDelete = Joi.object({
    estado: estado.required()
})
module.exports = {
    usuarioSchemaCreate,
    usuarioSchemaUpdate,
    usuarioSchemaDelete,
    idSchema
}
