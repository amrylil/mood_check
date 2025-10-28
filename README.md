# Mood Check-in API

API sederhana untuk mencatat mood harian pengguna. Dibangun menggunakan Bun, Hono, dan PostgreSQL dengan fokus pada keamanan dan performa.

## 🛠️ Teknologi

- **Runtime:** Bun
- **Framework:** Hono
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validasi:** Zod
- **Autentikasi:** JWT (via hono/jwt)
- **Lainnya:** bcrypt, TypeScript

## 🚀 Instalasi & Menjalankan

### Prasyarat

- Bun
- PostgreSQL

### Clone & Instal

```bash
git clone https://github.com/amrylil/mood_check.git
cd mood_check
bun install
```

### Setup Database & Environment

1. Salin `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

2. Isi `DATABASE_URL` di file `.env` dengan koneksi PostgreSQL Anda

3. Jalankan migrasi database:

```bash
bunx prisma migrate dev
```

### Jalankan Server

```bash
bun run dev
```

Server akan berjalan di:

- **Server:** http://localhost:3000
- **Docs:** http://localhost:3000/api/v1/docs/ui

## ⚙️ Konfigurasi

Buat file `.env` berdasarkan `.env.example`:

```env
# Port server
PORT=3000

# URL koneksi database PostgreSQL Anda (sesuai format Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"

# Kunci rahasia untuk menandatangani JWT
JWT_SECRET="ganti-dengan-kunci-rahasia-anda-yang-kuat"
```

## 📡 Alur & Endpoint API

Semua endpoint berada di bawah prefix `/api/v1`.

### Alur Autentikasi (Wajib)

Semua endpoint mood terproteksi. Pengguna harus login terlebih dahulu.

1. **Login:** Panggil `POST /auth/login` untuk mendapatkan Access Token (JWT)
2. **Panggil Endpoint:** Untuk semua request ke `/mood`, sertakan header Authorization:

```
Authorization: Bearer <token_anda>
```

**Keamanan:** Server mengambil `userId` langsung dari token. Anda tidak perlu mengirim `userId` di URL.

### 🔓 Endpoint Autentikasi (Publik)

#### `POST /auth/register`

Mendaftarkan pengguna baru.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### `POST /auth/login`

Login untuk mendapatkan token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 🔒 Endpoint Mood (Terproteksi)

Endpoint ini wajib menyertakan header `Authorization: Bearer <token>`.

#### `POST /mood`

Menyimpan mood baru untuk pengguna yang sedang login.

**Request Body:**

```json
{
  "userId": "user-id",
  "mood_score": 8,
  "mood_label": "Happy",
  "notes": "Hari yang menyenangkan!"
}
```

**Catatan Keamanan:** `userId` di body harus sama dengan `userId` di dalam token.

#### `GET /mood`

Menampilkan riwayat mood milik Anda (pengguna yang sedang login).

**Response:**

```json
[
  {
    "id": "mood-id",
    "mood_score": 8,
    "mood_label": "Happy",
    "notes": "Hari yang menyenangkan!",
    "created_at": "2025-10-28T10:00:00Z"
  }
]
```

#### `GET /mood/summary`

Menampilkan ringkasan mood 30 hari terakhir milik Anda.

**Response:**

```json
{
  "userId": "user-id",
  "period": "30 days",
  "average_score": 7.5,
  "total_reports": 25
}
```
