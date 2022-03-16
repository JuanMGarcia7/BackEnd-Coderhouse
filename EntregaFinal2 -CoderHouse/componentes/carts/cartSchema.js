import Joi from "joi";

const productos = Joi.array();
const timestamp = Joi.string().min(4).required();

export default {
  timestamp,
  productos,
};
