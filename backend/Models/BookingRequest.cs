namespace ResortBackend.Models;

public class BookingRequest
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string? Email { get; set; }
    public DateOnly CheckIn { get; set; }
    public DateOnly CheckOut { get; set; }
    public int Adults { get; set; }
    public int Children { get; set; }
    public int? RoomId { get; set; }
    public Room? Room { get; set; }
    public string SpecialRequests { get; set; } = string.Empty;
    public string Status { get; set; } = "Yangi"; // Yangi, Tasdiqlangan, Rad etilgan
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
