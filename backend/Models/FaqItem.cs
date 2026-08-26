namespace ResortBackend.Models;

public class FaqItem
{
    public int Id { get; set; }
    public string Question { get; set; } = string.Empty;
    public string Answer { get; set; } = string.Empty;
    public string Category { get; set; } = "General"; // General, Booking, SPA, Dining, Rules
    public int SortOrder { get; set; } = 0;
    public bool IsActive { get; set; } = true;
}
