import db from "../config/db.js";


export const getCategories = (req,res) => {
    db.query("SELECT * FROM  product_categories ", (err, results) => {
        if(err) return res.status(500).json(err);
        res.json(results);
    });
};

export const getCategoriesById = (req,res) => {
    db.query("SELECT * FROM product_categories WHERE CATEGORY_ID =?",
        [req.params.id],
        (err,results) => {
            if(err) return  res.status(500).json(err);
            if (results.length === 0)
                return res.status(404).json({message :  "Category not found"});
            res.json(results[0]);
        }
    );
};
export const createCategories = (req, res) => {
    const { CATEGORY_ID, CATEGORY } = req.body;

    // Optional: cek duplikat CATEGORY_ID sebelum insert
    db.query(
        "SELECT * FROM product_categories WHERE CATEGORY_ID = ?",
        [CATEGORY_ID],
        (err, results) => {
            if(err) return res.status(500).json(err);
            if(results.length > 0){
                return res.status(400).json({ message: "CATEGORY_ID sudah ada!" });
            }

            // Insert data baru
            db.query(
                "INSERT INTO product_categories (CATEGORY_ID, CATEGORY) VALUES (?, ?)",
                [CATEGORY_ID, CATEGORY],
                (err, result) => {
                    if(err) return res.status(500).json(err);
                    res.json({ message: "Category created", id: CATEGORY_ID });
                }
            );
        }
    );
};

export const updateCategories = (req, res) => {
    const { CATEGORY } = req.body;
    const { id } = req.params;

    db.query(
        "UPDATE product_categories SET CATEGORY = ? WHERE CATEGORY_ID = ?",
        [CATEGORY, id],
        (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.json({ message: "Category Updated" });
        }
    );
};

export const deleteCategories = (req, res) => {
    db.query(
        "DELETE FROM product_categories WHERE CATEGORY_ID = ?",
        [req.params.id],
        (err) => {
            if(err) return res.status(500).json(err);
            res.json({message : "Category deleted"});
        }
    );
};