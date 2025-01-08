import { CATEGORIES_CONTROLLER } from "@backend/controllers/categories-controller";
import { AuthMiddleware } from "@backend/middlewares/auth-middleware";
import { handler } from "@backend/middlewares/helpers";
import { addCategoryValidator, removeCategoryValidator } from "@backend/middlewares/validators/categories-validators";

export const POST = handler(
  AuthMiddleware(true),
  addCategoryValidator,
  CATEGORIES_CONTROLLER.addCategory
)

export const DELETE = handler(
  AuthMiddleware(true),
  removeCategoryValidator,
  CATEGORIES_CONTROLLER.deleteCategory
)

export const GET = handler(
  CATEGORIES_CONTROLLER.getAllCategories
)