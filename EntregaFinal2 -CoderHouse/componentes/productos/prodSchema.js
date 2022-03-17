import Joi from "Joi";

const title = Joi.string().min(3).required();
const thumbnail = Joi.string().required();
const price = Joi.string().required();
const timestamp = Joi.string().required();
const id = Joi.number().required();

export default {
  title,
  thumbnail,
  price,
  timestamp,
  id,
};
