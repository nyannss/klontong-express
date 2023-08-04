import { Router } from 'express';

import productController from '../controllers/product.controller';
import auth from '../middlewares/auth';
import uploader from '../middlewares/memoryUpload';

const productRouter: Router = Router();
productRouter.get("/", productController.index);
productRouter.get("/:id", productController.show);
productRouter.post(
  "/",
  auth.check,
  auth.admin,
  uploader,
  productController.store
);
productRouter.patch(
  "/:id",
  auth.check,
  auth.admin,
  uploader,
  productController.update
);
productRouter.delete("/:id", auth.check, auth.admin, productController.destroy);

export default productRouter;
