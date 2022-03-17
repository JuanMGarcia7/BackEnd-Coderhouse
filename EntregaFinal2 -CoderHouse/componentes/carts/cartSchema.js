import Joi from "joi";

const productos = Joi.array();
const timestamp = Joi.string().required();
const id = Joi.number();

export default {
  id,
  timestamp,
  productos,
};
