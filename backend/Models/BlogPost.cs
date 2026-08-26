namespace ResortBackend.Models;

public class BlogPost
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string Category { get; set; } = "Resort"; // SPA, Resort, Events, Guides
    public string Author { get; set; } = "Archazor Team";
    public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
    public string ImageUrl { get; set; } = string.Empty;
    public int ReadTimeMinutes { get; set; } = 5;
    public string MetaTitle { get; set; } = string.Empty;
    public string MetaDescription { get; set; } = string.Empty;
    public bool IsPublished { get; set; } = true;
}
