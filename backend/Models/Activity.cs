namespace ResortBackend.Models;

public class Activity
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty; // Outdoor, Winter, Indoor, Kids, Sports
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Currency { get; set; } = "UZS";
    public bool IncludedInStay { get; set; } = false;
    public string Schedule { get; set; } = string.Empty; // e.g. "Har kuni 09:00 - 18:00"
    public string Season { get; set; } = "All"; // Summer, Winter, All
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; } = 0;
}
