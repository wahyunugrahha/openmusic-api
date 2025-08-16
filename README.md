# Open Music API v1

Open Music API v1 adalah API RESTful untuk mengelola data album dan lagu. API ini dibangun menggunakan **Hapi.js** dan menggunakan **PostgreSQL** sebagai basis data.

## ✨ Fitur Utama

### 🎵 Manajemen Album
- Menambah album baru
- Melihat detail album
- Memperbarui album
- Menghapus album
- Menyimpan daftar lagu dalam album

### 🎶 Manajemen Lagu
- Menambah lagu baru
- Melihat detail lagu
- Memperbarui lagu
- Menghapus lagu
- Mendapatkan daftar lagu dengan filter berdasarkan `title` dan/atau `performer`

---

## ⚙️ Persyaratan

- **Node.js** (>= 10)
- **PostgreSQL** (>= 8.0)

---

## 🚀 Pengaturan Proyek

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal.

### 1. Klon Repositori
```bash
git clone https://github.com/wahyunugrahha/openmusic-api.git
cd openmusic-api
git checkout v1
```

### 2. Instalasi Dependensi
```bash
npm install
```

**Dependensi utama:**
- `@hapi/hapi` → Kerangka kerja Node.js
- `pg` → Klien PostgreSQL untuk Node.js
- `node-pg-migrate` → Sistem migrasi database PostgreSQL
- `joi` → Validator skema objek
- `nanoid` → Pembangkit ID unik
- `dotenv` → Memuat variabel lingkungan
- `nodemon` → Restart otomatis saat perubahan kode

### 3. Konfigurasi Database
Buat file **.env** di root direktori proyek untuk menyimpan kredensial database:

```env
PORT=5000
HOST=localhost
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_username
PG_PASSWORD=your_password
PG_DATABASE=your_database_name
```

> ⚠️ Ganti `PG_USER`, `PG_PASSWORD`, dan `PG_DATABASE` dengan kredensial PostgreSQL Anda.

### 4. Menjalankan Migrasi Database
```bash
npm run migrate
```

Migrasi akan membuat tabel berikut:
- **albums** → `id`, `name`, `year`
- **songs** → `id`, `title`, `year`, `genre`, `performer`, `duration`, `album_id`

### 5. Menjalankan Server
```bash
npm start
```

Server berjalan di: [http://localhost:5000](http://localhost:5000)

---

## 📖 Dokumentasi API

### 📀 Endpoints Album
| Metode | Jalur          | Deskripsi                          |
|--------|----------------|------------------------------------|
| POST   | /albums        | Menambahkan album baru             |
| GET    | /albums/{id}   | Mendapatkan detail album berdasarkan ID |
| PUT    | /albums/{id}   | Memperbarui album berdasarkan ID   |
| DELETE | /albums/{id}   | Menghapus album berdasarkan ID     |

### 🎼 Endpoints Lagu
| Metode | Jalur          | Deskripsi                          |
|--------|----------------|------------------------------------|
| POST   | /songs         | Menambahkan lagu baru              |
| GET    | /songs         | Mendapatkan semua lagu (support filter `title`, `performer`) |
| GET    | /songs/{id}    | Mendapatkan detail lagu berdasarkan ID |
| PUT    | /songs/{id}    | Memperbarui lagu berdasarkan ID    |
| DELETE | /songs/{id}    | Menghapus lagu berdasarkan ID      |

---

## ✅ Validator Skema

Proyek menggunakan **Joi** untuk validasi payload.

- **Album**: membutuhkan `name` (string) dan `year` (number, positif).
- **Lagu**: membutuhkan `title` (string), `year` (number, positif), `genre` (string), `performer` (string).  
  Opsi tambahan: `duration` (number), `albumId` (string).

---

## 🧪 Testing
Tes API tersedia dalam koleksi **Postman**.  
Anda bisa mengimpor file koleksi ke Postman untuk mencoba endpoint.

---

## 🔍 Linter
Gunakan ESLint untuk menjaga konsistensi kode:
```bash
npm run lint
```

---

## 📌 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan API.  
Silakan gunakan dan modifikasi sesuai kebutuhan Anda.
