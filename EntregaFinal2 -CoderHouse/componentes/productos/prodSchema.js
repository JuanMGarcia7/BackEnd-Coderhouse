import Joi from "joi";

const title = Joi.string().min(3).required();
const thumbnail = Joi.string().min(4).required();
const price = Joi.string().min(4).required();
const timestamp = Joi.string().min(4).required();

export default {
  title,
  thumbnail,
  price,
  timestamp,
};
