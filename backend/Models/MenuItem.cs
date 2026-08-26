namespace ResortBackend.Models;

public class MenuItem
{
    public int Id { get; set; }
    public string Category { get; set; } = string.Empty; // Starter, Main, Dessert, Beverage, Breakfast
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Currency { get; set; } = "UZS";
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsAvailable { get; set; } = true;
    public bool RequiresPreOrder { get; set; } = false;
    public int SortOrder { get; set; } = 0;
}
