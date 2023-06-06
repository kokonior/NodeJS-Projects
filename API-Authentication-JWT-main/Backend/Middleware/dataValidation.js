const Joi = require('@hapi/joi');

const dataValidation = (Schema, data) => {
    return Schema.validate(data);
}

module.exports.dataValidation = dataValidation;
