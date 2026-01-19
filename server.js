import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.use(cors({
  origin: "http://localhost:4321", // Astro
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   SESSION
====================== */
app.use(session({
  secret: "pos-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2,
  },
}));

/* ======================
   ROUTES
====================== */
app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

/* ======================
   ROOT CHECK
====================== */
app.get("/", (req, res) => {
  res.json({ message: "API berjalan" });
});

/* ======================
   404 JSON (ANTI HTML)
====================== */
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

/* ======================
   SERVER
====================== */
app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});
