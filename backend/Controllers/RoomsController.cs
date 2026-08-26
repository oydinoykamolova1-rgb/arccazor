using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/rooms")]
[Route("api/rooms")]
public class RoomsController : ControllerBase
{
    private readonly ResortDbContext _context;

    public RoomsController(ResortDbContext context)
    {
        _context = context;
    }

    // GET: api/rooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RoomDto>>> GetRooms(
        [FromQuery] int? guests,
        [FromQuery] decimal? maxPrice,
        [FromQuery] string? viewType)
    {
        var query = _context.Rooms
            .Include(r => r.Images)
            .Include(r => r.RoomAmenities)
                .ThenInclude(ra => ra.Amenity)
            .Where(r => r.IsAvailable && r.Status == "Active");

        if (guests.HasValue)
        {
            query = query.Where(r => r.MaxGuests >= guests.Value);
        }

        if (maxPrice.HasValue)
        {
            query = query.Where(r => r.PricePerNight <= maxPrice.Value);
        }

        if (!string.IsNullOrWhiteSpace(viewType))
        {
            query = query.Where(r => r.ViewType.ToLower().Contains(viewType.ToLower()));
        }

        var rooms = await query.ToListAsync();

        var roomDtos = rooms.Select(r => new RoomDto(
            r.Id,
            r.Slug,
            r.Name,
            r.ShortDescription,
            r.Description,
            r.PricePerNight,
            r.Area,
            r.MaxGuests,
            r.BaseAdults,
            r.MaxChildren,
            r.ExtraBedCount,
            r.ViewType,
            r.Status,
            r.CoverImage,
            r.IsAvailable,
            r.IsFeatured,
            r.CheckInTime,
            r.CheckOutTime,
            r.Images.OrderBy(i => i.SortOrder).Select(i => new RoomImageDto(i.Id, i.ImageUrl, i.SortOrder)).ToList(),
            r.RoomAmenities.Select(ra => new AmenityDto(ra.Amenity.Id, ra.Amenity.Name, ra.Amenity.Icon)).ToList()
        ));

        return Ok(roomDtos);
    }

    // GET: api/rooms/presidential-mountain-suite
    [HttpGet("{slug}")]
    public async Task<ActionResult<RoomDto>> GetRoomBySlug(string slug)
    {
        var room = await _context.Rooms
            .Include(r => r.Images)
            .Include(r => r.RoomAmenities)
                .ThenInclude(ra => ra.Amenity)
            .FirstOrDefaultAsync(r => r.Slug == slug);

        if (room == null)
        {
            return NotFound(new { message = "Xona topilmadi" });
        }

        var roomDto = new RoomDto(
            room.Id,
            room.Slug,
            room.Name,
            room.ShortDescription,
            room.Description,
            room.PricePerNight,
            room.Area,
            room.MaxGuests,
            room.BaseAdults,
            room.MaxChildren,
            room.ExtraBedCount,
            room.ViewType,
            room.Status,
            room.CoverImage,
            room.IsAvailable,
            room.IsFeatured,
            room.CheckInTime,
            room.CheckOutTime,
            room.Images.OrderBy(i => i.SortOrder).Select(i => new RoomImageDto(i.Id, i.ImageUrl, i.SortOrder)).ToList(),
            room.RoomAmenities.Select(ra => new AmenityDto(ra.Amenity.Id, ra.Amenity.Name, ra.Amenity.Icon)).ToList()
        );

        return Ok(roomDto);
    }
}
