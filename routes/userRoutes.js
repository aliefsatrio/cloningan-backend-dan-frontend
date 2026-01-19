import express from "express";
import {
  getUsers,
  getUserById,
  getUserStats,
  showUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);          // list transaksi
router.get("/stats", getUserStats); // penghasilan + total customer
router.get("/:id", getUserById);    // detail transaksi
router.get("/:id", showUser);

export default router;
