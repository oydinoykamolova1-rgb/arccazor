namespace ResortBackend.Models;

public class SpaService
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty; // Massage, Sauna, Pool, Facial, Rituals
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Currency { get; set; } = "UZS";
    public int DurationMinutes { get; set; } = 60;
    public bool IncludedInStay { get; set; } = false;
    public bool RequiresAppointment { get; set; } = true;
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; } = 0;
}
