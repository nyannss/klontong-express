import { Router } from 'express';

import productController from '../controllers/product.controller';
import uploader from '../middlewares/memoryUpload';

const productRouter: Router = Router();
productRouter.get("/", productController.index);
productRouter.get("/:id", productController.show);
productRouter.post("/", uploader, productController.store);
productRouter.patch("/:id", uploader, productController.update);
productRouter.delete("/:id", productController.destroy);

export default productRouter;
