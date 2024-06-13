import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../Controllers/categoryController";

const categoryRouter = Router();
categoryRouter.post("", addCategory)
categoryRouter.get("", getCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);  

export default categoryRouter;