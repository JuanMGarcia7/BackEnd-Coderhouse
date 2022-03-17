import Joi from "joi";

const productos = Joi.array();
const timestamp = Joi.string().required();

export default {
  timestamp,
  productos,
};
