<<<<<<< HEAD
# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
=======
### CRUD REST API Node.js

**Nama:** Alief Satrio
**Nim:** 24090072
**Kelas:** 3C
**Repository:** nodejs-crud-restapi  

## Deskripsi
Project ini merupakan REST API sederhana menggunakan Node.js dan Express.js dengan database MySQL.  
API ini digunakan untuk mengelola data categories dan products dengan fitur CRUD (Create, Read, Update, Delete).

Struktur project dibuat terpisah antara routes, controller, dan konfigurasi database agar mudah dipahami.

## Teknologi yang Digunakan
- Node.js
- Express.js
- MySQL
- dotenv
- nodemon

## Struktur Folder
- config/db.js = koneksi database
- controllers/categoryController.js, productController.js, userController.js = logika CRUD
- node_modules = Tempat semua dependensi project Node.js disimpan
- routes/categoryRoutes.js, productRoutes.js, userRoutes.js = penentu URL dan aksi apa yang dijalankan saat request masuk.
- env = .env adalah tempat menyimpan konfigurasi dan data sensitif agar tidak ditulis langsung di kode.
- package-lock.json = package-lock.json mengunci versi dependensi agar hasil instalasi selalu konsisten di semua environment.
- package.json = package.json adalah identitas dan pusat konfigurasi project yang mendefinisikan dependensi, script, dan metadata aplikasi.
- server.js = server.js adalah titik awal aplikasi yang menyiapkan server Express, memuat konfigurasi, dan menghubungkan semua routes agar API bisa berjalan.

## Konfigurasi Environment
Buat file `.env` lalu isi:
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nama_database


## Cara Menjalankan Project
bash
npm install
npm run dev

Server akan berjalan di:
http://localhost:3000

## Endpoint API
# Categories
POST /categories
GET /categories
GET /categories/:id\
PUT /categories/:id
DELETE /categories/:id

# Products
POST /products
GET /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

## Pengujian
Pengujian API dilakukan menggunakan Postman dengan mencoba seluruh endpoint CRUD.
Screenshot hasil pengujian disertakan pada repository.

## Kesimpulan
REST API berhasil dijalankan dan seluruh fitur CRUD berfungsi dengan baik sesuai dengan kebutuhan tugas.
>>>>>>> 84f43d90b5be86ec7a848765dfd8d45a8b9f3670
