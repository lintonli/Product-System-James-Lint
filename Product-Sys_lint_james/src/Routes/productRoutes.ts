import { Router } from "express";
import { addProduct, deleteProduct, getProduct, getProductByCategory, getProducts, updateProduct } from "../Controllers/productController";
import { verifyTokens } from '../Middlewares/index';

const productRouter = Router();
productRouter.post("", verifyTokens,addProduct)
productRouter.get("",verifyTokens,getProducts)
 productRouter.get("/:id",verifyTokens,getProduct)
productRouter.get("/category/:id",verifyTokens,getProductByCategory)
productRouter.patch("/:id",verifyTokens,updateProduct)
productRouter.delete("/:id",verifyTokens,deleteProduct)

export default productRouter;
