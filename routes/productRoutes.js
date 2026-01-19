import express from "express";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.post("/", createProduct);

export default router;