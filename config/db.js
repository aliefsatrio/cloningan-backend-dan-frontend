import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//perintah koneksi
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

//JALANKAN KONEKSI DATABASENYA
db.connect((err) => {
    //jika ada error
    if (err) {
        console.log("Error koneksi Database", err);
        return;
    }

    //kika berhasil
    console.log("Mysql berhasil connect!");
});

export default db;