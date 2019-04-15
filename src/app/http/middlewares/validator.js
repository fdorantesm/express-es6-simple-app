import includes from 'lodash/includes';
import has from 'lodash/has';
import get from 'lodash/get';
import trimStart from 'lodash/trimStart';
import trimEnd from 'lodash/trimEnd';
import joi from 'joi';
import joiSchemas from 'schemas';

const schemas = {};

Object.keys(joiSchemas).map((route) => {
  schemas[trimEnd(route)] = joiSchemas[route];
});

const supportedMethods = ['post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

/**
 * Middleware to validate controller data schemas needs.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {Function} next
 * @return {Function} Joi Validate Callback
 */
export default async (req, res, next) => {
  const method = req.method.toLowerCase();
  const path = trimStart((req.route.path !== '/' ? req.route.path : ''), '/');
  const route = trimEnd(`${req.baseUrl}/${path}`, '/');
  if (includes(supportedMethods, method) && has(schemas, route)) {
    const schema = get(schemas, route);
    if (schema) {
      try {
        req.body = await joi.validate(req.body, schema, validationOptions);
        next();
      } catch (err) {
        const errors = {
          type: err.name,
          errors: err.details,
        };
        res.boom.badData('Invalid request data.', errors);
      }
    }
  } else {
    next();
  }
};
