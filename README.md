# Open Music API v3

Open Music API v3 adalah pengembangan dari versi sebelumnya (v2). API ini dibangun menggunakan **Hapi.js** dan **PostgreSQL** untuk mengelola data album, lagu, user, autentikasi, playlist, dan kolaborasi.  
Pada versi ini juga ditambahkan fitur:

- Ekspor playlist ke email
- Unggah sampul album
- Like pada album

---

## ✨ Fitur Utama

- 📀 Manajemen Album (CRUD, cover upload, like album)
- 🎶 Manajemen Lagu (CRUD + filter by title/performer)
- 👤 Manajemen User (registrasi, detail user)
- 🔑 Autentikasi (login, refresh, logout)
- 🎼 Playlist (CRUD, tambah/hapus lagu, aktivitas)
- 🤝 Kolaborasi (tambah/hapus kolaborator playlist)
- ✉️ Ekspor Playlist (via RabbitMQ ke email)

---

## ⚙️ Dependency

### Dependencies

- @hapi/hapi — Framework server Hapi.js
- @hapi/inert — Menyajikan file statis
- @hapi/jwt — JSON Web Token untuk autentikasi
- amqplib — RabbitMQ client
- bcrypt — Hashing password
- dotenv — Load variabel lingkungan
- fs — Modul file system
- joi — Validasi payload
- nanoid — Generator ID unik
- node-pg-migrate — Migrasi database
- nodemon — Hot reload
- path — Modul untuk path sistem
- pg — PostgreSQL client
- redis — Redis client

### DevDependencies

- eslint — Linter
- @eslint/js
- globals

---

## 📂 Struktur Project

```
openmusic-api-main/
│── migrations/          # File migrasi database
│── postman/             # Koleksi Postman
│── src/
│   ├── api/             # Route & handler
│   │   ├── albums/
│   │   ├── songs/
│   │   ├── users/
│   │   ├── authentications/
│   │   ├── playlists/
│   │   ├── collaborations/
│   │   ├── exports/
│   │   ├── uploads/
│   │   └── albumlikes/
│   ├── error/           # Custom error handler
│   ├── service/         # Service (Postgres, Redis, RabbitMQ)
│   ├── tokenize/        # JWT Token manager
│   ├── utils/           # Utility functions
│   ├── validator/       # Joi validator schema
│   └── server.js        # Entry point server
│── package.json
│── .env.example
│── README.md
```

---

## 🚀 Setup Proyek

### 1. Clone Repo

```bash
git clone https://github.com/wahyunugrahha/openmusic-api.git
cd openmusic-api
git checkout v3
```

### 2. Install Dependency

```bash
npm install
```

### 3. Konfigurasi Environment

Buat file `.env` di root:

```env
PORT=5000
HOST=localhost

PG_HOST=localhost
PG_PORT=5432
PG_USER=your_username
PG_PASSWORD=your_password
PG_DATABASE=your_database_name

ACCESS_TOKEN_KEY=your_access_token_key
REFRESH_TOKEN_KEY=your_refresh_token_key
ACCESS_TOKEN_AGE=3600

RABBITMQ_SERVER=amqp://localhost
REDIS_SERVER=localhost
```

### 4. Migrasi Database

```bash
npm run migrate
```

### 5. Menjalankan Server

```bash
npm start
```

Server akan berjalan di [http://localhost:5000](http://localhost:5000)

---

## 📖 Dokumentasi API

### 📀 Album

- `POST /albums` → Tambah album
- `GET /albums/{id}` → Detail album
- `PUT /albums/{id}` → Update album
- `DELETE /albums/{id}` → Hapus album
- `POST /albums/{id}/covers` → Upload cover
- `GET /albums/{id}/likes` → Jumlah like
- `POST /albums/{id}/likes` → Like album
- `DELETE /albums/{id}/likes` → Hapus like

### 🎶 Lagu

- `POST /songs` → Tambah lagu
- `GET /songs` → Semua lagu (filter: title, performer)
- `GET /songs/{id}` → Detail lagu
- `PUT /songs/{id}` → Update lagu
- `DELETE /songs/{id}` → Hapus lagu

### 👤 User

- `POST /users` → Registrasi
- `GET /users/{id}` → Detail user
- `GET /users?username=` → Cari user by username

### 🔑 Autentikasi

- `POST /authentications` → Login
- `PUT /authentications` → Refresh token
- `DELETE /authentications` → Logout

### 🎼 Playlist

- `POST /playlists` → Buat playlist
- `GET /playlists` → Daftar playlist user
- `DELETE /playlists/{id}` → Hapus playlist
- `POST /playlists/{id}/songs` → Tambah lagu
- `GET /playlists/{id}/songs` → Lihat lagu
- `DELETE /playlists/{id}/songs` → Hapus lagu
- `GET /playlists/{id}/activities` → Aktivitas playlist

### 🤝 Kolaborasi

- `POST /collaborations` → Tambah kolaborator
- `DELETE /collaborations` → Hapus kolaborator

### ✉️ Ekspor

- `POST /export/playlists/{playlistId}` → Ekspor playlist ke email

---

## 🧪 Testing

Gunakan koleksi **Postman** yang tersedia di folder `postman/`:

- **Open Music API V3 Test.postman_collection.json**

---

## 🔍 Linter

Untuk menjaga kualitas kode:

```bash
npm run lint
```

---

## 📌 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan API.  
Silakan gunakan dan modifikasi sesuai kebutuhan.
