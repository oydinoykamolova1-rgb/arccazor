namespace ResortBackend.Models;

public class Room
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal PricePerNight { get; set; }
    public int Area { get; set; } // in sq. meters
    public int MaxGuests { get; set; }
    public int BaseAdults { get; set; } = 2;
    public int MaxChildren { get; set; } = 1;
    public int ExtraBedCount { get; set; } = 1;
    public string ViewType { get; set; } = "Mountain"; // Mountain, Forest, Pool, River
    public string Status { get; set; } = "Active"; // Active, Maintenance, OnRequest, Hidden
    public string CoverImage { get; set; } = string.Empty;
    public bool IsAvailable { get; set; } = true;
    public bool IsFeatured { get; set; } = false;
    public string CheckInTime { get; set; } = "14:00";
    public string CheckOutTime { get; set; } = "12:00";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<RoomImage> Images { get; set; } = new List<RoomImage>();
    public ICollection<RoomAmenity> RoomAmenities { get; set; } = new List<RoomAmenity>();
}
