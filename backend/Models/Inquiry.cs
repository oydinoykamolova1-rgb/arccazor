namespace ResortBackend.Models;

public class Inquiry
{
    public int Id { get; set; }
    public string Type { get; set; } = "GeneralContact"; // GeneralContact, EventInquiry, DiningReservation, SpaReservation, CallbackRequest, RoomBooking
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PreferredDate { get; set; }
    public int? GuestsCount { get; set; }
    public string? RoomTypeOrService { get; set; }
    public string Message { get; set; } = string.Empty;
    public string Status { get; set; } = "New"; // New, Contacted, Qualified, Won, Lost, Archived
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string? AdminNotes { get; set; }
}
