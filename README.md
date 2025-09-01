# Open Music API v3

Open Music API v3 adalah pengembangan dari versi sebelumnya (v2). API ini dibangun menggunakan **Hapi.js** dan **PostgreSQL** untuk mengelola data album, lagu, user, autentikasi, playlist, dan kolaborasi. Versi ini juga menambahkan fitur ekspor playlist, unggah sampul album, dan suka album.

---

## ✨ Fitur Utama

### 📀 Manajemen Album
- Menambah album baru.
- Melihat detail album.
- Memperbarui album.
- Menghapus album.
- Mengunggah sampul album.
- Melihat jumlah like pada album.

### 🎶 Manajemen Lagu
- Menambah lagu baru.
- Melihat detail lagu.
- Memperbarui lagu.
- Menghapus lagu.
- Mendapatkan daftar lagu dengan filter `title` dan/atau `performer`.

### 👤 Manajemen User
- Registrasi user baru.
- Mendapatkan detail user.
- Mendapatkan user berdasarkan username (filter: `username`).

### 🔑 Autentikasi
| Metode | Jalur              | Deskripsi                     |
|--------|--------------------|-------------------------------|
| POST   | /authentications   | Login (generate access token)|
| PUT    | /authentications   | Refresh access token|
| DELETE | /authentications   | Logout|

### 🎼 Playlist
| Metode | Jalur                              | Deskripsi                          |
|--------|------------------------------------|------------------------------------|
| POST   | /playlists                         | Membuat playlist baru|
| GET    | /playlists                         | Mendapatkan daftar playlist user|
| DELETE | /playlists/{id}                    | Menghapus playlist|
| POST   | /playlists/{id}/songs              | Menambahkan lagu ke playlist|
| GET    | /playlists/{id}/songs              | Mendapatkan lagu dalam playlist|
| DELETE | /playlists/{id}/songs              | Menghapus lagu dari playlist|
| GET    | /playlists/{id}/activities         | Melihat aktivitas playlist|

### 🤝 Endpoints Kolaborasi
| Metode | Jalur                  | Deskripsi                          |
|--------|------------------------|------------------------------------|
| POST   | /collaborations        | Menambahkan kolaborator ke playlist|
| DELETE | /collaborations        | Menghapus kolaborator dari playlist|

### 📤 Endpoints Ekspor
| Metode | Jalur                              | Deskripsi                               |
|--------|------------------------------------|-----------------------------------------|
| POST   | /export/playlists/{playlistId}     | Ekspor lagu dalam playlist ke email|

---

## ✅ Validator Skema
- **Album**: `name` (string, required), `year` (number, positif, required).
- **Lagu**: `title`, `year`, `genre`, `performer` (wajib). `duration` dan `albumId` opsional.
- **User**: `username` (string), `password` (string), `fullname` (string).
- **Autentikasi**: `username`, `password`, `refreshToken`.
- **Playlist**: `name` (string).
- **Kolaborasi**: `playlistId` (string), `userId` (string).
- **Ekspor**: `targetEmail` (email, required).
- **Unggah**: `content-type` (image/apng, image/avif, image/gif, image/jpeg, image/png, image/webp, required).

---

## 🧪 Testing
Tersedia koleksi **Postman** untuk menguji API v3:
- `Open Music API V3 Test.postman_collection.json`.

---

## 🔍 Linter
Gunakan ESLint untuk menjaga konsistensi kode:
```bash
npm run lint

---
## 📌 Lisensi
Proyek ini dibuat untuk tujuan pembelajaran dan pengembangan API.
Silakan gunakan dan modifikasi sesuai kebutuhan Anda.