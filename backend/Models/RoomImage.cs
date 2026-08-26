namespace ResortBackend.Models;

public class RoomImage
{
    public int Id { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int SortOrder { get; set; }

    public int RoomId { get; set; }
    public Room Room { get; set; } = null!;
}
