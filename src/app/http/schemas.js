import joi, * as type from 'libraries/joi';

const teamForm = joi.object().keys({
  name: type.tinyString.required(),
});

export default {
  '/teams': teamForm,
  '/teams/:id': teamForm,
};
