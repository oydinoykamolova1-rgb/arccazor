using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/availability")]
[Route("api/availability")]
public class AvailabilityController : ControllerBase
{
    private readonly ResortDbContext _context;

    public AvailabilityController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AvailableRoomDto>>> SearchAvailability([FromQuery] AvailabilityQueryDto query)
    {
        var adults = query.Adults > 0 ? query.Adults : 2;
        var children = query.Children >= 0 ? query.Children : 0;
        var totalGuests = adults + children;

        var roomsQuery = _context.Rooms
            .Include(r => r.Images)
            .Include(r => r.RoomAmenities)
            .ThenInclude(ra => ra.Amenity)
            .Where(r => r.IsAvailable && r.Status == "Active" && r.MaxGuests >= totalGuests);

        if (!string.IsNullOrWhiteSpace(query.ViewType))
        {
            roomsQuery = roomsQuery.Where(r => r.ViewType.ToLower().Contains(query.ViewType.ToLower()));
        }

        var rooms = await roomsQuery.ToListAsync();

        int nights = 1;
        if (!string.IsNullOrWhiteSpace(query.CheckIn) && !string.IsNullOrWhiteSpace(query.CheckOut))
        {
            if (DateTime.TryParse(query.CheckIn, out var ci) && DateTime.TryParse(query.CheckOut, out var co))
            {
                var diff = (co - ci).Days;
                if (diff > 0) nights = diff;
            }
        }

        var results = rooms.Select(r => new AvailableRoomDto(
            new RoomDto(
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
                r.Images.Select(img => new RoomImageDto(img.Id, img.ImageUrl, img.SortOrder)).ToList(),
                r.RoomAmenities.Select(ra => new AmenityDto(ra.Amenity.Id, ra.Amenity.Name, ra.Amenity.Icon)).ToList()
            ),
            TotalPrice: r.PricePerNight * nights,
            NightsCount: nights,
            IsAvailable: true
        )).ToList();

        return Ok(results);
    }

    [HttpPost("/api/v1/booking-sessions")]
    [HttpPost("/api/booking-sessions")]
    public async Task<ActionResult<BookingSessionResponseDto>> CreateBookingSession([FromBody] BookingSessionRequestDto req)
    {
        var room = await _context.Rooms.FindAsync(req.RoomId);
        if (room == null)
        {
            return NotFound(new { message = "Xona topilmadi." });
        }

        int nights = 1;
        if (DateTime.TryParse(req.CheckIn, out var ci) && DateTime.TryParse(req.CheckOut, out var co))
        {
            var diff = (co - ci).Days;
            if (diff > 0) nights = diff;
        }

        var sessionId = "sess_" + Guid.NewGuid().ToString("N")[..12];
        var totalAmount = room.PricePerNight * nights;

        var response = new BookingSessionResponseDto(
            SessionId: sessionId,
            CheckoutUrl: $"https://checkout.cloudbeds.com/archazor/reserve?session={sessionId}&room={room.Slug}",
            TotalAmount: totalAmount,
            Currency: "UZS",
            ExpiresAt: DateTime.UtcNow.AddMinutes(15)
        );

        return Ok(response);
    }
}
