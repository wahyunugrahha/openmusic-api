# Open Music API v3

Open Music API v3 adalah pengembangan dari versi sebelumnya (v2). API
ini dibangun menggunakan Hapi.js dan PostgreSQL untuk mengelola data
album, lagu, user, autentikasi, playlist, dan kolaborasi. Versi ini juga
menambahkan fitur ekspor playlist, unggah sampul album, dan suka album.

## ✨ Fitur Utama

### 📀 Manajemen Album

-   Menambah album baru
-   Melihat detail album
-   Memperbarui album
-   Menghapus album
-   Album dapat menyimpan daftar lagu
-   Mengunggah sampul album
-   Melihat jumlah like pada album

### 🎶 Manajemen Lagu

-   Menambah lagu baru
-   Melihat detail lagu
-   Memperbarui lagu
-   Menghapus lagu
-   Mendapatkan daftar lagu dengan filter title dan/atau performer

### 👤 Manajemen User

-   Registrasi user baru
-   Mendapatkan detail user

### 🔑 Autentikasi

-   Login dan mendapatkan access token
-   Refresh token
-   Logout (menghapus refresh token)

### 🎼 Playlist

-   Membuat playlist
-   Melihat daftar playlist milik user
-   Menghapus playlist
-   Menambahkan lagu ke playlist
-   Melihat daftar lagu dalam playlist
-   Menghapus lagu dari playlist
-   Mencatat aktivitas penambahan/penghapusan lagu

### 🤝 Kolaborasi

-   Menambahkan kolaborator ke playlist
-   Menghapus kolaborator dari playlist

### ✉️ Ekspor

-   Mengekspor playlist ke email

------------------------------------------------------------------------

## ⚙️ Persyaratan

-   Node.js (\>= 10)
-   PostgreSQL (\>= 8.0)
-   Redis (\>= 5.8)

------------------------------------------------------------------------

## 🚀 Pengaturan Proyek

### 1. Klon Repositori

``` bash
git clone https://github.com/wahyunugrahha/openmusic-api.git
cd openmusic-api
git checkout v3
```

### 2. Instalasi Dependensi

``` bash
npm install
```

Dependensi utama: - @hapi/hapi → Kerangka kerja Node.js - @hapi/inert →
Menampilkan aset statis - @hapi/jwt → JSON Web Token (JWT) untuk
autentikasi - pg → Klien PostgreSQL - redis → Klien Redis - amqplib →
Klien RabbitMQ - node-pg-migrate → Migrasi database - joi → Validasi
payload - nanoid → Pembangkit ID unik - bcrypt → Hashing password user -
dotenv → Memuat variabel lingkungan - nodemon → Restart otomatis saat
ada perubahan kode - path → Modul bawaan Node.js untuk menangani jalur
file - fs → Modul bawaan Node.js untuk menangani sistem file

### 3. Konfigurasi Database

Buat file `.env` di root direktori proyek:

``` env
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

### 4. Menjalankan Migrasi Database

``` bash
npm run migrate
```

Migrasi akan membuat tabel berikut: - albums - songs - users -
authentications - playlists - playlist_songs -
playlist_song_activities - collaborations - user_album_likes

### 5. Menjalankan Server

``` bash
npm start
```

Server berjalan di: <http://localhost:5000>

------------------------------------------------------------------------

## 📖 Dokumentasi API

### 📀 Endpoints Album

  Metode   Jalur                 Deskripsi
  -------- --------------------- -------------------------------
  POST     /albums               Menambahkan album baru
  GET      /albums/{id}          Mendapatkan detail album
  PUT      /albums/{id}          Memperbarui album
  DELETE   /albums/{id}          Menghapus album
  POST     /albums/{id}/covers   Menambahkan sampul album
  GET      /albums/{id}/likes    Mendapatkan jumlah like album
  POST     /albums/{id}/likes    Memberikan like pada album
  DELETE   /albums/{id}/likes    Menghapus like dari album

### 🎼 Endpoints Lagu

  Metode   Jalur         Deskripsi
  -------- ------------- ---------------------------------------------------
  POST     /songs        Menambahkan lagu baru
  GET      /songs        Mendapatkan semua lagu (filter: title, performer)
  GET      /songs/{id}   Mendapatkan detail lagu
  PUT      /songs/{id}   Memperbarui lagu
  DELETE   /songs/{id}   Menghapus lagu

### 👤 Endpoints User

  ------------------------------------------------------------------------
  Metode                Jalur               Deskripsi
  --------------------- ------------------- ------------------------------
  POST                  /users              Registrasi user baru

  GET                   /users/{id}         Mendapatkan detail user

  GET                   /users              Mendapatkan user berdasarkan
                                            username (filter: username)
  ------------------------------------------------------------------------

### 🔑 Endpoints Autentikasi

  Metode   Jalur              Deskripsi
  -------- ------------------ -------------------------------
  POST     /authentications   Login (generate access token)
  PUT      /authentications   Refresh access token
  DELETE   /authentications   Logout

### 🎼 Endpoints Playlist

  Metode   Jalur                        Deskripsi
  -------- ---------------------------- ----------------------------------
  POST     /playlists                   Membuat playlist baru
  GET      /playlists                   Mendapatkan daftar playlist user
  DELETE   /playlists/{id}              Menghapus playlist
  POST     /playlists/{id}/songs        Menambahkan lagu ke playlist
  GET      /playlists/{id}/songs        Mendapatkan lagu dalam playlist
  DELETE   /playlists/{id}/songs        Menghapus lagu dari playlist
  GET      /playlists/{id}/activities   Melihat aktivitas playlist

### 🤝 Endpoints Kolaborasi

  Metode   Jalur             Deskripsi
  -------- ----------------- -------------------------------------
  POST     /collaborations   Menambahkan kolaborator ke playlist
  DELETE   /collaborations   Menghapus kolaborator dari playlist

### 📤 Endpoints Ekspor

  -------------------------------------------------------------------------------------
  Metode                Jalur                            Deskripsi
  --------------------- -------------------------------- ------------------------------
  POST                  /export/playlists/{playlistId}   Ekspor lagu dalam playlist ke
                                                         email

  -------------------------------------------------------------------------------------

------------------------------------------------------------------------

## ✅ Validator Skema

-   **Album**: name (string, required), year (number, positif, required)
-   **Lagu**: title, year, genre, performer (wajib), duration dan
    albumId opsional
-   **User**: username (string), password (string), fullname (string)
-   **Autentikasi**: username, password, refreshToken
-   **Playlist**: name (string)
-   **Kolaborasi**: playlistId (string), userId (string)
-   **Ekspor**: targetEmail (email, required)
-   **Unggah**: content-type (image/apng, image/avif, image/gif,
    image/jpeg, image/png, image/webp, required)

------------------------------------------------------------------------

## 🧪 Testing

Tersedia koleksi Postman untuk menguji API v3:\
**Open Music API V3 Test.postman_collection.json**

------------------------------------------------------------------------

## 🔍 Linter

Gunakan ESLint untuk menjaga konsistensi kode:

``` bash
npm run lint
```

------------------------------------------------------------------------

## 📌 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan API.\
Silakan gunakan dan modifikasi sesuai kebutuhan Anda.
