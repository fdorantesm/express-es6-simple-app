import joi from 'joi';

export default joi;
export const tinyString = joi.string().max(24);
