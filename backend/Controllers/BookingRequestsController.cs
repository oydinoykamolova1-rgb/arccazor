using Microsoft.AspNetCore.Mvc;
using ResortBackend.Data;
using ResortBackend.DTOs;
using ResortBackend.Models;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/booking-requests")]
public class BookingRequestsController : ControllerBase
{
    private readonly ResortDbContext _context;

    public BookingRequestsController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<BookingRequestDto>> CreateBookingRequest([FromBody] CreateBookingRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FullName) || string.IsNullOrWhiteSpace(dto.Phone))
        {
            return BadRequest(new { message = "Ism va telefon raqami kiritilishi shart" });
        }

        if (dto.CheckIn >= dto.CheckOut)
        {
            return BadRequest(new { message = "Ketish sanasi kelish sanasidan keyin bo'lishi kerak" });
        }

        var booking = new BookingRequest
        {
            FullName = dto.FullName.Trim(),
            Phone = dto.Phone.Trim(),
            Email = dto.Email?.Trim(),
            CheckIn = dto.CheckIn,
            CheckOut = dto.CheckOut,
            Adults = dto.Adults <= 0 ? 1 : dto.Adults,
            Children = dto.Children < 0 ? 0 : dto.Children,
            RoomId = dto.RoomId,
            SpecialRequests = dto.SpecialRequests?.Trim() ?? string.Empty,
            Status = "Yangi",
            CreatedAt = DateTime.UtcNow
        };

        _context.BookingRequests.Add(booking);
        await _context.SaveChangesAsync();

        string? roomName = null;
        if (dto.RoomId.HasValue)
        {
            var room = await _context.Rooms.FindAsync(dto.RoomId.Value);
            roomName = room?.Name;
        }

        var responseDto = new BookingRequestDto(
            booking.Id,
            booking.FullName,
            booking.Phone,
            booking.Email,
            booking.CheckIn,
            booking.CheckOut,
            booking.Adults,
            booking.Children,
            booking.RoomId,
            roomName,
            booking.SpecialRequests,
            booking.Status,
            booking.CreatedAt
        );

        return CreatedAtAction(nameof(CreateBookingRequest), new { id = booking.Id }, responseDto);
    }
}
