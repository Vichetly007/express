const controller = require("../controller/category.controller");
const { upload } = require("../util/helper");

const category = (app) => {
  app.post("/api/category", upload.single("upload_emp"), controller.create);
  // app.delete("/api/category",controller.remove)
  app.get("/api/category", controller.getAll);
  app.post("/api/category", controller.creates);
};

module.exports = category;
