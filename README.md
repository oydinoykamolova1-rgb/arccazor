# 🏔️ ARCHAZOR Mountain Resort & Spa

> Toshkent viloyati Bo'stonliq tumanidagi **Archazor** tog' kurortining zamonaviy veb-sayti.  
> Loyiha: **Next.js (TypeScript)** frontend + **ASP.NET Core 10 Web API** backend

---

## 📋 Mundarija

- [Loyiha haqida](#loyiha-haqida)
- [Texnologik Stak](#texnologik-stak)
- [Loyiha Tuzilishi](#loyiha-tuzilishi)
- [Sahifalar](#sahifalar)
- [API Endpointlar](#api-endpointlar)
- [Lokal Ishga Tushirish](#lokal-ishga-tushirish)
- [Deploy (Vercel + Railway)](#deploy)

---

## 🏨 Loyiha Haqida

**Archazor Resort** veb-sayti kurortning asosiy marketing va bronlash funksiyalarini qamrab oladi:

- Resort haqida bosh sahifa va premium dizayn
- Xonalar katalogi va batafsil tafsilotlari (Backend API bilan ulangan)
- Fine Dining Restoran va menyu
- SPA & Wellness majmuasi
- Faoliyatlar va Tadbirlar
- Bron qilish va Aloqa formalari (real-time Backend'ga yuboriladi)
- Admin Panel — kelgan so'rovlarni boshqarish

---

## 🛠️ Texnologik Stak

### Frontend
| Texnologiya | Maqsad |
|---|---|
| **Next.js 14+** (App Router) | SEO va tez yuklanadigan sahifalar |
| **TypeScript** | Xavfsiz va aniq kod yozish |
| **Tailwind CSS** | Zamonaviy va responsive dizayn |
| **Lucide React** | Ikonalar to'plami |

### Backend
| Texnologiya | Maqsad |
|---|---|
| **ASP.NET Core 10** Web API | REST API server |
| **Entity Framework Core** | Ma'lumotlar bazasiga ORM orqali kirish |
| **SQLite** | Mahalliy baza (PostgreSQL'ga almashtiriladi) |
| **Swagger / OpenAPI** | API hujjatlashtirish va sinash |

---

## 📁 Loyiha Tuzilishi

```text
arccazor/
├── backend/                        # ASP.NET Core 10 Web API
│   ├── Controllers/
│   │   ├── RoomsController.cs
│   │   ├── BookingRequestsController.cs
│   │   ├── ContactRequestsController.cs
│   │   └── AdminController.cs
│   ├── Models/
│   │   ├── Room.cs
│   │   ├── RoomImage.cs
│   │   ├── Amenity.cs
│   │   ├── RoomAmenity.cs
│   │   ├── ContactRequest.cs
│   │   └── BookingRequest.cs
│   ├── DTOs/
│   │   └── Dtos.cs
│   ├── Data/
│   │   ├── ResortDbContext.cs
│   │   └── DbInitializer.cs        # Avtomatik seed data
│   ├── Dockerfile
│   ├── Program.cs
│   └── appsettings.json
│
└── frontend/                       # Next.js TypeScript
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx            # Bosh sahifa
    │   │   ├── rooms/
    │   │   │   ├── page.tsx        # Xonalar katalogi
    │   │   │   └── [slug]/page.tsx # Xona tafsilotlari
    │   │   ├── restaurant/page.tsx
    │   │   ├── spa/page.tsx
    │   │   ├── activities/page.tsx
    │   │   ├── events/page.tsx
    │   │   ├── contact/page.tsx
    │   │   └── admin/page.tsx      # Admin panel
    │   ├── components/
    │   │   ├── layout/             # Header, Footer
    │   │   ├── rooms/              # RoomCard
    │   │   └── ui/                 # BookingModal
    │   ├── data/                   # Statik ma'lumotlar (JSON/TS)
    │   ├── lib/
    │   │   └── api.ts              # Backend API client
    │   └── types/
    │       └── index.ts
    ├── .env.example
    └── next.config.ts
```

---

## 📄 Sahifalar

| Sahifa | URL | Tavsif |
|---|---|---|
| Bosh sahifa | `/` | Hero banner, featured xonalar, SPA/Restoran preview |
| Xonalar katalogi | `/rooms` | API dan xonalar, filtrlash imkoniyati |
| Xona tafsilotlari | `/rooms/[slug]` | Galereya, qulayliklar, bron shakli |
| Restoran | `/restaurant` | Menyu kategoriyalari va taomlar |
| SPA & Wellness | `/spa` | Basseyn, sauna, massaj xizmatlari |
| Faoliyatlar | `/activities` | O'yinlar va hordiq zonalari |
| Tadbirlar | `/events` | Konferensiyalar va bayram marosimlari |
| Kontakt | `/contact` | Aloqa formasi va xarita |
| Admin Panel | `/admin` | Bron so'rovlari va murojaatlar boshqaruvi |

---

## 🔌 API Endpointlar

### Public Endpointlar
```http
GET    /api/rooms                          # Xonalar ro'yxati (filter: guests, maxPrice, viewType)
GET    /api/rooms/{slug}                   # Xona tafsilotlari
POST   /api/booking-requests               # Yangi bron so'rovi
POST   /api/contact-requests               # Aloqa xabari yuborish
```

### Admin Endpointlar
```http
GET    /api/admin/booking-requests         # Barcha bron so'rovlari
PATCH  /api/admin/booking-requests/{id}/status  # Status yangilash
GET    /api/admin/contact-requests         # Barcha murojaatlar
GET    /api/admin/stats                    # Statistika
```

---

## 🚀 Lokal Ishga Tushirish

### Talablar
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org)

### 1. Reponi klonlash

```bash
git clone https://github.com/oydinoykamolova1-rgb/arccazor.git
cd arccazor
```

### 2. Backend ishga tushirish

```bash
cd backend
dotnet run
```
> API: `http://localhost:5144` | Swagger: `http://localhost:5144/swagger`

### 3. Frontend ishga tushirish

```bash
cd frontend

# .env.local faylini yarating
echo "NEXT_PUBLIC_API_URL=http://localhost:5144/api" > .env.local

npm install
npm run dev
```
> Sayt: `http://localhost:3000`

---

## ☁️ Deploy

### Frontend → Vercel

1. [vercel.com](https://vercel.com) da `frontend/` papkasini import qiling
2. Environment Variables ga qo'shing:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend.railway.app/api
   ```

### Backend → Railway

1. [railway.app](https://railway.app) da `backend/` papkasini import qiling
2. `Dockerfile` avtomatik aniqlanadi
3. Environment Variables:
   ```
   AllowedOrigins = https://your-app.vercel.app
   ASPNETCORE_URLS = http://+:8080
   ```

---

## 🎨 Dizayn Palitrasai

```css
--background: #f6f3ed;   /* Krem fon */
--primary:    #244934;   /* O'rmon yashil */
--accent:     #b38a56;   /* Oltin rang */
--text:       #20251f;   /* Asosiy matn */
--muted:      #6d746b;   /* Ikkinchi darajali matn */
```

---

## 📞 Loyiha Muallifi

**Archazor Resort Clone** — `ARCHAZOR_SIMPLE_CLONE.md` spetsifikatsiyasi asosida ishlab chiqilgan.

> Resort: Toshkent viloyati, Bo'stonliq tumani, Chimyon tog' zonasi
