import express from "express";
import {
  createCategories,
  getCategories,
  deleteCategories,
  updateCategories,
  getCategoriesById,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategories);
router.get("/", getCategories);
router.get("/:id", getCategoriesById);
router.put("/:id", updateCategories);
router.delete("/:id", deleteCategories);

export default router;
