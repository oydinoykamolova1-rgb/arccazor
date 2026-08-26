using Microsoft.EntityFrameworkCore;
using ResortBackend.Models;

namespace ResortBackend.Data;

public static class DbInitializer
{
    public static void Initialize(ResortDbContext context)
    {
        context.Database.EnsureCreated();

        if (context.Rooms.Any())
        {
            return; // DB already seeded
        }

        // 1. Amenities
        var wifi = new Amenity { Name = "Tezkor Wi-Fi", Icon = "wifi" };
        var tv = new Amenity { Name = "Smart TV 55\"", Icon = "tv" };
        var minibar = new Amenity { Name = "Mini-bar", Icon = "coffee" };
        var terrace = new Amenity { Name = "Tog' manzarali terras", Icon = "mountain" };
        var jacuzzi = new Amenity { Name = "Jakuzi", Icon = "bath" };
        var fireplace = new Amenity { Name = "Kamin", Icon = "flame" };
        var aircon = new Amenity { Name = "Konditsioner", Icon = "wind" };
        var safe = new Amenity { Name = "Seyf", Icon = "shield" };
        var breakfast = new Amenity { Name = "Nonushta kiritilgan", Icon = "utensils" };

        context.Amenities.AddRange(wifi, tv, minibar, terrace, jacuzzi, fireplace, aircon, safe, breakfast);
        context.SaveChanges();

        // 2. Rooms
        var room1 = new Room
        {
            Slug = "presidential-mountain-suite",
            Name = "Prezident Tog' Sviti",
            ShortDescription = "Tog'larning afsonaviy panoramasi bilan eng hashamatli 2 qavatli svit.",
            Description = "Prezident tog' sviti — Archazor resort'ining eng oliy toifadagi xonasi hisoblanadi. U keng panoramali derazalar, xususiy kaminli mehmonxona va xususiy terrace bilan jihozlangan. Oila va premium dam olish uchun eng mukammal tanlov.",
            PricePerNight = 3500000,
            Area = 120,
            MaxGuests = 4,
            BaseAdults = 2,
            MaxChildren = 2,
            ExtraBedCount = 1,
            ViewType = "Tog' va O'rmon Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = true,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        var room2 = new Room
        {
            Slug = "deluxe-chalet-villa",
            Name = "Deluks Shale Villa",
            ShortDescription = "Sharshara va archazor o'rmoni bag'ridagi shinam yog'och kottedj.",
            Description = "Yog'ochdan qurilgan eko-chalet villa sizga tabiat bilan to'liq uyg'unlik va sokinlik baxsh etadi. Shaxsiy barbekyu zonasi, jakuzi va keng veranda mavjud.",
            PricePerNight = 2800000,
            Area = 95,
            MaxGuests = 6,
            BaseAdults = 4,
            MaxChildren = 2,
            ExtraBedCount = 2,
            ViewType = "Archa O'rmoni Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = true,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        var room3 = new Room
        {
            Slug = "junior-mountain-suite",
            Name = "Junior Tog' Sviti",
            ShortDescription = "Er-xotin va juftliklar uchun romantik va shinam panoramali xona.",
            Description = "Katta qirollik karovati, panoramali oyna va zamonaviy interyerga ega Junior Suite. Ertalabki quyosh va tog' shabadasini xonangiz terrassasidan his qiling.",
            PricePerNight = 1800000,
            Area = 60,
            MaxGuests = 2,
            BaseAdults = 2,
            MaxChildren = 0,
            ExtraBedCount = 0,
            ViewType = "Panoramali Tog' Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = true,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        var room4 = new Room
        {
            Slug = "standard-double-room",
            Name = "Standart Standart Xona",
            ShortDescription = "Barcha qulayliklarga ega shinam va zamonaviy 2 kishilik xona.",
            Description = "Qulay karovatlar, zamonaviy dush va ish stoli bilan ta'minlangan standart xonamiz qisqa muddatli dam olish va biznes sayohatlar uchun mos keladi.",
            PricePerNight = 1200000,
            Area = 40,
            MaxGuests = 2,
            BaseAdults = 2,
            MaxChildren = 1,
            ExtraBedCount = 1,
            ViewType = "Basseyn Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = false,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        var room5 = new Room
        {
            Slug = "family-duplex-suite",
            Name = "Oilaviy Dupleks Svit",
            ShortDescription = "Katta oilalar uchun 2 qavatli, 2 alohida yotoqxonali keng xona.",
            Description = "Bolalar va kattalar uchun alohida hududlarga ega dupleks xona. 2 ta sanuzel, keng mehmonxona va barcha zamonaviy maishiy texnikalar mavjud.",
            PricePerNight = 2400000,
            Area = 85,
            MaxGuests = 5,
            BaseAdults = 3,
            MaxChildren = 2,
            ExtraBedCount = 1,
            ViewType = "Tog' va Basseyn Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = false,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        var room6 = new Room
        {
            Slug = "spa-wellness-villa",
            Name = "SPA & Wellness Villa",
            ShortDescription = "Shaxsiy saunasi va jakuzisi bo'lgan eksklyuziv dam olish kottedji.",
            Description = "Ushbu villada dam olish jarayonida shaxsiy sauna va gidromassajli saunadan bahramand bo'lishingiz mumkin. SPA muolajalari xonaning o'zida ham taqdim etiladi.",
            PricePerNight = 3100000,
            Area = 100,
            MaxGuests = 4,
            BaseAdults = 2,
            MaxChildren = 2,
            ExtraBedCount = 1,
            ViewType = "Shaxsiy Bog' va Tog' Manzarasi",
            Status = "Active",
            CoverImage = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
            IsAvailable = true,
            IsFeatured = true,
            CheckInTime = "14:00",
            CheckOutTime = "12:00",
            CreatedAt = DateTime.UtcNow
        };

        context.Rooms.AddRange(room1, room2, room3, room4, room5, room6);
        context.SaveChanges();

        // Room Images
        context.RoomImages.AddRange(
            new RoomImage { RoomId = room1.Id, ImageUrl = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 },
            new RoomImage { RoomId = room1.Id, ImageUrl = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", SortOrder = 2 },

            new RoomImage { RoomId = room2.Id, ImageUrl = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 },
            new RoomImage { RoomId = room2.Id, ImageUrl = "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80", SortOrder = 2 },

            new RoomImage { RoomId = room3.Id, ImageUrl = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 },

            new RoomImage { RoomId = room4.Id, ImageUrl = "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 },

            new RoomImage { RoomId = room5.Id, ImageUrl = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 },

            new RoomImage { RoomId = room6.Id, ImageUrl = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80", SortOrder = 1 }
        );

        // Room Amenities
        context.RoomAmenities.AddRange(
            new RoomAmenity { RoomId = room1.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = tv.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = minibar.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = terrace.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = jacuzzi.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = fireplace.Id },
            new RoomAmenity { RoomId = room1.Id, AmenityId = breakfast.Id },

            new RoomAmenity { RoomId = room2.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room2.Id, AmenityId = fireplace.Id },
            new RoomAmenity { RoomId = room2.Id, AmenityId = terrace.Id },
            new RoomAmenity { RoomId = room2.Id, AmenityId = jacuzzi.Id },
            new RoomAmenity { RoomId = room2.Id, AmenityId = breakfast.Id },

            new RoomAmenity { RoomId = room3.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room3.Id, AmenityId = tv.Id },
            new RoomAmenity { RoomId = room3.Id, AmenityId = terrace.Id },
            new RoomAmenity { RoomId = room3.Id, AmenityId = breakfast.Id }
        );

        // 3. MenuItems
        context.MenuItems.AddRange(
            new MenuItem
            {
                Category = "Gazaklar",
                Name = "Tog' o'tlari va Pishloq Assortisi",
                Description = "Toshkent tog' yaylovlarining organik pishloqlari, yovvoyi kashnich va zaytunchalar.",
                Price = 120000,
                Currency = "UZS",
                ImageUrl = "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80",
                IsAvailable = true,
                RequiresPreOrder = false,
                SortOrder = 1
            },
            new MenuItem
            {
                Category = "Asosiy Taomlar",
                Name = "Archazor Sobiq Tovoq Qovurma",
                Description = "Tog' qo'zichog'i go'shti, tender kartoshka va xushbo'y ziravorlar bilan kamin ustida pishirilgan.",
                Price = 280000,
                Currency = "UZS",
                ImageUrl = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
                IsAvailable = true,
                RequiresPreOrder = true,
                SortOrder = 2
            },
            new MenuItem
            {
                Category = "Asosiy Taomlar",
                Name = "Marmar Mol Go'shtidan Stash",
                Description = "Ribeye steyk, sarmsoqli sariyog' va tog' sabzavotlari bilan taqdim etiladi.",
                Price = 320000,
                Currency = "UZS",
                ImageUrl = "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80",
                IsAvailable = true,
                RequiresPreOrder = false,
                SortOrder = 3
            },
            new MenuItem
            {
                Category = "Desertlar",
                Name = "Yovvoyi Maymunjonli Cheesecake",
                Description = "Chimyon o'rmonlaridan terilgan yangi mevalar va qarsillama biskvit.",
                Price = 75000,
                Currency = "UZS",
                ImageUrl = "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
                IsAvailable = true,
                RequiresPreOrder = false,
                SortOrder = 4
            },
            new MenuItem
            {
                Category = "Ichimliklar",
                Name = "Archazor Tog' Choyi",
                Description = "Kiyik o'ti, zardolugul, tog' yalpizi va tog' bali qo'shilgan organikal choy.",
                Price = 50000,
                Currency = "UZS",
                ImageUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
                IsAvailable = true,
                RequiresPreOrder = false,
                SortOrder = 5
            }
        );

        // 4. SpaServices
        context.SpaServices.AddRange(
            new SpaService
            {
                Category = "Sauna",
                Name = "Fin Quruq Saunasi va Muzli Hovuz",
                Description = "Metabolizmni oshiruvchi va mushaklarni bo'shashtiruvchi 90 gradusli sauna.",
                Price = 250000,
                Currency = "UZS",
                DurationMinutes = 60,
                IncludedInStay = true,
                RequiresAppointment = false,
                ImageUrl = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
                SortOrder = 1
            },
            new SpaService
            {
                Category = "Massage",
                Name = "Archazor Eksklyuziv Tog' Massaji",
                Description = "Tabiiy efir moylari va issiq tog' toshlari yordamida chuqur relax massaj.",
                Price = 450000,
                Currency = "UZS",
                DurationMinutes = 80,
                IncludedInStay = false,
                RequiresAppointment = true,
                ImageUrl = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
                SortOrder = 2
            },
            new SpaService
            {
                Category = "Pool",
                Name = "Isitiladigan Panoramali Basseyn",
                Description = "Yil bo'yi 28°C haroratda ishlaydigan tog' manzarali ochiq basseyn.",
                Price = 0,
                Currency = "UZS",
                DurationMinutes = 120,
                IncludedInStay = true,
                RequiresAppointment = false,
                ImageUrl = "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
                SortOrder = 3
            },
            new SpaService
            {
                Category = "Rituals",
                Name = "Turk Hamomi & Kese Piling Ritual",
                Description = "Issiq mermar tosh ustida ko'pik massaji va tanani to'liq tozalash.",
                Price = 380000,
                Currency = "UZS",
                DurationMinutes = 70,
                IncludedInStay = false,
                RequiresAppointment = true,
                ImageUrl = "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80",
                SortOrder = 4
            }
        );

        // 5. Activities
        context.Activities.AddRange(
            new Activity
            {
                Category = "Winter",
                Name = "Amirsoy & Chimyon Chang'i Sayohati",
                Description = "Professional instruktorlar va zamonaviy slayd uskunalari ijarasi bilan chang'i uchish.",
                Price = 350000,
                Currency = "UZS",
                IncludedInStay = false,
                Schedule = "Har kuni 09:00 - 17:00",
                Season = "Winter",
                ImageUrl = "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=600&q=80",
                SortOrder = 1
            },
            new Activity
            {
                Category = "Outdoor",
                Name = "Kvadrotsikl Tog' Safarisi",
                Description = "Archazor tog' yollari va sharsharalari bo'ylab unutilmas ekstremal haydash.",
                Price = 300000,
                Currency = "UZS",
                IncludedInStay = false,
                Schedule = "10:00, 14:00, 16:30",
                Season = "All",
                ImageUrl = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
                SortOrder = 2
            },
            new Activity
            {
                Category = "Outdoor",
                Name = "Tog' Trekkingi va Piknik",
                Description = "Gid hamrohligida tog' cho'qqisiga piyoda sayr va eksklyuziv tabiat bag'ridagi tushlik.",
                Price = 0,
                Currency = "UZS",
                IncludedInStay = true,
                Schedule = "Seshanba va Shanba 10:00",
                Season = "Summer",
                ImageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
                SortOrder = 3
            }
        );

        // 6. BlogPosts
        context.BlogPosts.AddRange(
            new BlogPost
            {
                Slug = "togda-dam-olishning-7-salomatlik-siri",
                Title = "Tog'da dam olishning 7 ta mo'jizakor salomatlik siri",
                ShortDescription = "Tog' havosining toza kislorodi, archalardan ajralib chiquvchi fitonsidlar va sokinlik salomatligingizga qanday ta'sir qiladi?",
                Content = @"Tog' havosi inson organizmi uchun eng tabiiy va kuchli davolash vositalaridan biridir. Archazor kurorti joylashgan Bo'stonliq tumanidagi Chimyon tog'lari o'zining noyob mikroklimati bilan mashhur.

1. Fitonsidlar — archalardan ajralib chiquvchi moddalar nafas yo'llarini tozalaydi.
2. Stress darajasini tushirish — tabiat sado va ranglari asab tizimini tinchlantiradi.
3. Uyqu sifatining oshishi — toza kislorod chuqur va maromli uyquni ta'minlaydi.

Archazor Resort'da hordiq chiqarish orqali siz nafaqat maroqli dam olasiz, balki immunitetingizni ham sezilarli darajada mustahkamlab olasiz.",
                Category = "Resort",
                Author = "Dr. Javlon Karimov",
                PublishedAt = DateTime.UtcNow.AddDays(-10),
                ImageUrl = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
                ReadTimeMinutes = 4,
                MetaTitle = "Tog'da dam olishning salomatlik sirlari | Archazor Resort",
                MetaDescription = "Tog' havosi va archalar bag'rida dam olishning salomatlik va immunitetga foydalari haqida maqola.",
                IsPublished = true
            },
            new BlogPost
            {
                Slug = "spa-va-wellness-ritualining-afzalliklari",
                Title = "Tog' SPA va Detox ritullarining zamonaviy inson uchun ahamiyati",
                ShortDescription = "Ish haftasidan so'ng kuchingizni qayta tiklash uchun SPA muolajalarini qanday to'g'ri tanlash kerak?",
                Content = @"Katta shahar sur'ati va kunlik majburiyatlar inson ruhiyati hamda tanasiga charchoq yig'adi. Archazor SPA markazida biz aynan shu charchoqni chiqaruvchi maxsus vanna va massaj dasturlarini yo'lga qo'yganmiz.

- Sauna va issiq hovuz tanadagi toksinlarni chiqarib yuboradi.
- Eksklyuziv massaj tana mushaklaridagi taranglikni bo'shashtiradi.

Bizning mutaxassislarimiz har bir mehmon uchun individual muolaja rejasini tuzib berishadi.",
                Category = "SPA",
                Author = "Malika Alimova",
                PublishedAt = DateTime.UtcNow.AddDays(-5),
                ImageUrl = "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
                ReadTimeMinutes = 5,
                MetaTitle = "SPA va Wellness ritullari | Archazor Resort",
                MetaDescription = "Tog' bag'ridagi SPA va sauna muolajalarining foydalari haqida batafsil.",
                IsPublished = true
            }
        );

        // 7. FaqItems
        context.FaqItems.AddRange(
            new FaqItem
            {
                Question = "Xonalarga kirish (Check-in) va chiqish (Check-out) vaqtlari qaysi?",
                Answer = "Standard check-in vaqti soat 14:00 da, check-out esa soat 12:00 da amalga oshiriladi. Avvalroq kirish va kechroq chiqish imkoniyati xonalarning bo'shligiga qarab qo'shimcha to'lov evaziga ko'rib chiqilishi mumkin.",
                Category = "Rules",
                SortOrder = 1,
                IsActive = true
            },
            new FaqItem
            {
                Question = "Bronlash uchun oldindan to'lov tartibi qanday?",
                Answer = "Xonani band qilish uchun 100% yoki minimal 50% oldindan to'lov talab qilinadi. To'lovni Click, Payme yoki bank kartalari orqali amalga oshirishingiz mumkin.",
                Category = "Booking",
                SortOrder = 2,
                IsActive = true
            },
            new FaqItem
            {
                Question = "Bolalar uchun yashash va ovqatlanish bepulmi?",
                Answer = "6 yoshgacha bo'lgan bolalar uchun ota-onalari bilan birgalikda yashash va nonushta bepul taqdim etiladi.",
                Category = "General",
                SortOrder = 3,
                IsActive = true
            },
            new FaqItem
            {
                Question = "Uy hayvonlarini olib kelish mumkinmi?",
                Answer = "Resort hududida boshqa mehmonlar qulayligi va xavfsizligini ta'minlash maqsadida uy hayvonlari bilan kelish taqiqlanadi.",
                Category = "Rules",
                SortOrder = 4,
                IsActive = true
            }
        );

        // 8. Inquiries (CRM Leads)
        context.Inquiries.AddRange(
            new Inquiry
            {
                Type = "RoomBooking",
                FullName = "Alisher Navoiy",
                Phone = "+998 90 123 45 67",
                Email = "alisher@example.com",
                PreferredDate = "2026-09-01",
                GuestsCount = 4,
                RoomTypeOrService = "Prezident Tog' Sviti",
                Message = "Oila a'zolarim bilan 3 kunlik dam olish uchun bron qilmoqchiman.",
                Status = "New",
                CreatedAt = DateTime.UtcNow.AddHours(-2)
            },
            new Inquiry
            {
                Type = "EventInquiry",
                FullName = "Farrux Zokirov",
                Phone = "+998 99 888 77 66",
                Email = "farrux@company.uz",
                PreferredDate = "2026-09-15",
                GuestsCount = 35,
                RoomTypeOrService = "Korporativ Konferensiya & Banket",
                Message = "35 kishilik IT jamoa uchun konferensiya zali va 2 kunlik tur topshiriq va taklifnomasini yuboring.",
                Status = "Contacted",
                CreatedAt = DateTime.UtcNow.AddHours(-12),
                AdminNotes = "Telegram orqali tijorat taklifi yuborildi."
            },
            new Inquiry
            {
                Type = "SpaReservation",
                FullName = "Nigora Umarova",
                Phone = "+998 93 555 44 33",
                Email = "nigora@gmail.com",
                PreferredDate = "2026-08-28",
                GuestsCount = 2,
                RoomTypeOrService = "Tog' Massaji & Turk Hamomi",
                Message = "Juma kuni soat 16:00 ga 2 kishiga massajga yozdirmoqchiman.",
                Status = "Qualified",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                AdminNotes = "Soat 16:00 vaqti tasdiqlandi."
            }
        );

        context.SaveChanges();
    }
}
