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

        // Amenities
        var wifi = new Amenity { Name = "Tezkor Wi-Fi", Icon = "wifi" };
        var tv = new Amenity { Name = "Smart TV 55\"", Icon = "tv" };
        var minibar = new Amenity { Name = "Mini-bar", Icon = "coffee" };
        var terrace = new Amenity { Name = "Tog' manzarali terras", Icon = "mountain" };
        var jacuzzi = new Amenity { Name = "Jakuazi", Icon = "bath" };
        var fireplace = new Amenity { Name = "Kamin", Icon = "flame" };
        var aircon = new Amenity { Name = "Konditsioner", Icon = "wind" };
        var safe = new Amenity { Name = "Seyf", Icon = "shield" };
        var breakfast = new Amenity { Name = "Nonushta kiritilgan", Icon = "utensils" };

        context.Amenities.AddRange(wifi, tv, minibar, terrace, jacuzzi, fireplace, aircon, safe, breakfast);
        context.SaveChanges();

        // Rooms
        var room1 = new Room
        {
            Slug = "presidential-mountain-suite",
            Name = "Prezident Tog' Sviti",
            ShortDescription = "Tog'larning afsonaviy panoramasi bilan eng hashamatli 2 qavatli svit.",
            Description = "Prezident tog' sviti — Archazor resort'ining eng oliy toifadagi xonasi hisoblanadi. U keng panoramali derazalar, xususiy kaminli mehmonxona va xususiy terrace bilan jihozlangan. Oila va premium dam olish uchun eng mukammal tanlov.",
            PricePerNight = 3500000,
            Area = 120,
            MaxGuests = 4,
            ViewType = "Tog' va O'rmon Manzarasi",
            CoverImage = "/images/rooms/presidential-suite-1.jpg",
            IsAvailable = true,
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
            ViewType = "Archa O'rmoni Manzarasi",
            CoverImage = "/images/rooms/deluxe-chalet-1.jpg",
            IsAvailable = true,
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
            ViewType = "Panoramali Tog' Manzarasi",
            CoverImage = "/images/rooms/junior-suite-1.jpg",
            IsAvailable = true,
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
            ViewType = "Basseyn Manzarasi",
            CoverImage = "/images/rooms/standard-double-1.jpg",
            IsAvailable = true,
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
            ViewType = "Tog' va Basseyn Manzarasi",
            CoverImage = "/images/rooms/family-duplex-1.jpg",
            IsAvailable = true,
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
            ViewType = "Shaxsiy Bog' va Tog' Manzarasi",
            CoverImage = "/images/rooms/spa-villa-1.jpg",
            IsAvailable = true,
            CreatedAt = DateTime.UtcNow
        };

        context.Rooms.AddRange(room1, room2, room3, room4, room5, room6);
        context.SaveChanges();

        // Room Images
        context.RoomImages.AddRange(
            new RoomImage { RoomId = room1.Id, ImageUrl = "/images/rooms/presidential-suite-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room1.Id, ImageUrl = "/images/rooms/presidential-suite-2.jpg", SortOrder = 2 },
            new RoomImage { RoomId = room1.Id, ImageUrl = "/images/rooms/presidential-suite-3.jpg", SortOrder = 3 },

            new RoomImage { RoomId = room2.Id, ImageUrl = "/images/rooms/deluxe-chalet-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room2.Id, ImageUrl = "/images/rooms/deluxe-chalet-2.jpg", SortOrder = 2 },

            new RoomImage { RoomId = room3.Id, ImageUrl = "/images/rooms/junior-suite-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room3.Id, ImageUrl = "/images/rooms/junior-suite-2.jpg", SortOrder = 2 },

            new RoomImage { RoomId = room4.Id, ImageUrl = "/images/rooms/standard-double-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room4.Id, ImageUrl = "/images/rooms/standard-double-2.jpg", SortOrder = 2 },

            new RoomImage { RoomId = room5.Id, ImageUrl = "/images/rooms/family-duplex-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room5.Id, ImageUrl = "/images/rooms/family-duplex-2.jpg", SortOrder = 2 },

            new RoomImage { RoomId = room6.Id, ImageUrl = "/images/rooms/spa-villa-1.jpg", SortOrder = 1 },
            new RoomImage { RoomId = room6.Id, ImageUrl = "/images/rooms/spa-villa-2.jpg", SortOrder = 2 }
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
            new RoomAmenity { RoomId = room3.Id, AmenityId = breakfast.Id },

            new RoomAmenity { RoomId = room4.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room4.Id, AmenityId = tv.Id },
            new RoomAmenity { RoomId = room4.Id, AmenityId = aircon.Id },

            new RoomAmenity { RoomId = room5.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room5.Id, AmenityId = tv.Id },
            new RoomAmenity { RoomId = room5.Id, AmenityId = terrace.Id },
            new RoomAmenity { RoomId = room5.Id, AmenityId = breakfast.Id },

            new RoomAmenity { RoomId = room6.Id, AmenityId = wifi.Id },
            new RoomAmenity { RoomId = room6.Id, AmenityId = jacuzzi.Id },
            new RoomAmenity { RoomId = room6.Id, AmenityId = minibar.Id },
            new RoomAmenity { RoomId = room6.Id, AmenityId = breakfast.Id }
        );

        // Initial Sample Booking and Contact Requests for testing
        context.BookingRequests.Add(new BookingRequest
        {
            FullName = "Alisher Navoiy",
            Phone = "+998 90 123 45 67",
            Email = "alisher@example.com",
            CheckIn = DateOnly.FromDateTime(DateTime.Today.AddDays(5)),
            CheckOut = DateOnly.FromDateTime(DateTime.Today.AddDays(8)),
            Adults = 2,
            Children = 0,
            RoomId = room1.Id,
            SpecialRequests = "Deraza oldida kamin yoqib qo'yilishi va erta kelish so'raladi.",
            Status = "Yangi",
            CreatedAt = DateTime.UtcNow.AddHours(-3)
        });

        context.ContactRequests.Add(new ContactRequest
        {
            FullName = "Sardor Olimov",
            Phone = "+998 97 765 43 21",
            Email = "sardor@example.com",
            Message = "Korporativ 20 kishilik tadbir o'tkazish narxlari bo'yicha ma'lumot bersangiz.",
            CreatedAt = DateTime.UtcNow.AddHours(-5)
        });

        context.SaveChanges();
    }
}
