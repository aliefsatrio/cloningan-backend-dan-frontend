import db from "../config/db.js";

/* ======================
   GET PRODUCTS (MAINAN ONLY)
====================== */
export const getProducts = (req, res) => {
  const sql = `
    SELECT
      p.PRODUCT_ID,
      p.PRODUCT_NAME,
      p.PRICE,
      p.STOCK,
      pc.CATEGORY
    FROM products p
    JOIN product_categories pc
      ON p.CATEGORY_ID = pc.CATEGORY_ID
    WHERE pc.CATEGORY = 'Mainan'
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil data produk" });
    }

    return res.json({
      message: "OK",
      data: results
    });
  });
};

/* ======================
   GET PRODUCT BY ID
====================== */
export const getProductById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      p.PRODUCT_ID,
      p.PRODUCT_NAME,
      p.PRICE,
      p.STOCK,
      pc.CATEGORY
    FROM products p
    JOIN product_categories pc
      ON p.CATEGORY_ID = pc.CATEGORY_ID
    WHERE p.PRODUCT_ID = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal mengambil detail produk" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    return res.json({
      message: "OK",
      data: results[0]
    });
  });
};

/* ======================
   UPDATE PRODUCT
====================== */
export const updateProduct = (req, res) => {
  const { id } = req.params;
  const { PRODUCT_NAME, PRICE, STOCK } = req.body;

  const sql = `
    UPDATE products
    SET PRODUCT_NAME = ?, PRICE = ?, STOCK = ?
    WHERE PRODUCT_ID = ?
  `;

  db.query(sql, [PRODUCT_NAME, PRICE, STOCK, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Gagal update produk" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    return res.json({ message: "Produk berhasil diupdate" });
  });
};

/* ======================
   DELETE PRODUCT
====================== */
export const deleteProduct = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM products WHERE PRODUCT_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Gagal menghapus produk" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
      }

      return res.json({ message: "Produk berhasil dihapus" });
    }
  );
};

// CREATE (KHUSUS PRODUK MAINAN)
export const createProduct = (req, res) => {
  const { PRODUCT_NAME, PRICE, STOCK } = req.body;

  if (!PRODUCT_NAME || !PRODUCT_NAME.trim()) {
    return res.status(400).json({ message: "Nama produk wajib diisi" });
  }

  const price = Number(PRICE);
  const stock = Number(STOCK);

  if (Number.isNaN(price) || price < 0) {
    return res.status(400).json({ message: "Harga tidak valid" });
  }

  if (Number.isNaN(stock) || stock < 0) {
    return res.status(400).json({ message: "Stok tidak valid" });
  }

  // Ambil category_id untuk kategori "Mainan"
  const categorySql = `
    SELECT category_id
    FROM product_categories
    WHERE category = 'Mainan'
    LIMIT 1
  `;

  db.query(categorySql, (err, cat) => {
    if (err) return res.status(500).json({ message: err.message });
    if (cat.length === 0) {
      return res.status(404).json({ message: "Kategori Mainan tidak ditemukan" });
    }

    const category_id = cat[0].category_id;

    const insertSql = `
      INSERT INTO products (category_id, product_name, price, stock)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      insertSql,
      [category_id, PRODUCT_NAME.trim(), price, stock],
      (err2, result) => {
        if (err2) return res.status(500).json({ message: err2.message });

        return res.status(201).json({
          message: "Produk mainan berhasil ditambahkan",
          product_id: result.insertId,
        });
      }
    );
  });
};
