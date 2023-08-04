import { Router } from 'express';

import categoryController from '../controllers/category.controller';
import auth from '../middlewares/auth';
import uploader from '../middlewares/memoryUpload';

const categoryRouter: Router = Router();
categoryRouter.get("/", categoryController.index);
categoryRouter.get("/:id", categoryController.show);
categoryRouter.post(
  "/",
  auth.check,
  auth.admin,
  uploader,
  categoryController.store
);
categoryRouter.patch(
  "/:id",
  auth.check,
  auth.admin,
  uploader,
  categoryController.update
);
categoryRouter.delete(
  "/:id",
  auth.check,
  auth.admin,
  categoryController.destroy
);

export default categoryRouter;
