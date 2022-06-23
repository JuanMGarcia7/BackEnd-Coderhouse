const Router = require("koa-router");
const {
  getProducts,
  postProducts,
  getById,
  deleteByID,
} = require("../controller/productos.js");

const router = new Router({
  prefix: "/api/productos",
});

router.get("/", getProducts);
router.post("/", postProducts);
router.get("/:id", getById);
router.delete("/:id", deleteByID);

module.exports = router;
