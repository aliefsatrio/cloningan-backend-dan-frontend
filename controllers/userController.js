import db from "../config/db.js";

// LIST TRANSAKSI
export const getUsers = (req, res) => {
  const sql = `
    SELECT 
      o.ORDER_ID,
      o.ORDER_DATE,
      c.CUST_NAME,
      u.USERNAME AS CASHIER,
      pm.METHOD AS PAYMENT_METHOD,
      o.BANK_TRANS,
      o.TOTAL
    FROM orders o
    JOIN customers c ON c.CUST_ID = o.CUST_ID
    JOIN cashiers u ON u.USER_ID = o.USER_ID
    JOIN payment_methods pm ON pm.METHOD_ID = o.METHOD_ID
    ORDER BY o.ORDER_DATE DESC
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ data: rows });
  });
};

// DETAIL TRANSAKSI
export const getUserById = (req, res) => {
  const { id } = req.params;

  const headerSql = `
    SELECT 
      o.ORDER_ID,
      o.ORDER_DATE,
      c.CUST_NAME,
      u.USERNAME,
      pm.METHOD,
      o.BANK_TRANS,
      o.TOTAL
    FROM orders o
    JOIN customers c ON c.CUST_ID = o.CUST_ID
    JOIN cashiers u ON u.USER_ID = o.USER_ID
    JOIN payment_methods pm ON pm.METHOD_ID = o.METHOD_ID
    WHERE o.ORDER_ID = ?
  `;

  const detailSql = `
    SELECT 
      p.PRODUCT_NAME,
      od.QTY,
      od.PRICE,
      (od.QTY * od.PRICE) AS SUBTOTAL
    FROM order_details od
    JOIN products p ON p.PRODUCT_ID = od.PRODUCT_ID
    WHERE od.ORDER_ID = ?
  `;

  db.query(headerSql, [id], (err, header) => {
    if (err || header.length === 0)
      return res.status(404).json({ message: "Order tidak ditemukan" });

    db.query(detailSql, [id], (err2, items) => {
      if (err2) return res.status(500).json({ message: err2.message });

      res.json({
        order: header[0],
        items
      });
    });
  });
};

// STATISTIK
export const getUserStats = (req, res) => {
  const sql = `
    SELECT 
      COUNT(DISTINCT CUST_ID) AS TOTAL_CUSTOMER,
      SUM(TOTAL) AS TOTAL_INCOME
    FROM orders
  `;

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows[0]);
  });
};

/* ======================
   GET TRANSACTION DETAIL
====================== */
export const showUser = (req, res) => {
  const { id } = req.params;

  // HEADER TRANSAKSI
  const orderQuery = `
    SELECT 
      o.ORDER_ID,
      o.ORDER_DATE,
      c.CUST_NAME,
      u.USERNAME,
      pm.METHOD,
      o.TOTAL
    FROM orders o
    JOIN customers c ON c.CUST_ID = o.CUST_ID
    JOIN users u ON u.USER_ID = o.USER_ID
    JOIN payment_methods pm ON pm.METHOD_ID = o.METHOD_ID
    WHERE o.ORDER_ID = ?
  `;

  // DETAIL ITEM TRANSAKSI
  const itemsQuery = `
    SELECT 
      p.PRODUCT_NAME,
      od.QTY,
      od.PRICE
    FROM order_details od
    JOIN products p ON p.PRODUCT_ID = od.PRODUCT_ID
    WHERE od.ORDER_ID = ?
  `;

  db.query(orderQuery, [id], (err, orderResult) => {
    if (err) return res.status(500).json(err);
    if (orderResult.length === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    db.query(itemsQuery, [id], (err2, itemsResult) => {
      if (err2) return res.status(500).json(err2);

      return res.json({
        order: orderResult[0],
        items: itemsResult
      });
    });
  });
};
