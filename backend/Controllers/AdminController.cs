using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly ResortDbContext _context;

    public AdminController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet("booking-requests")]
    public async Task<ActionResult<IEnumerable<BookingRequestDto>>> GetBookingRequests()
    {
        var bookings = await _context.BookingRequests
            .Include(b => b.Room)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();

        var dtos = bookings.Select(b => new BookingRequestDto(
            b.Id,
            b.FullName,
            b.Phone,
            b.Email,
            b.CheckIn,
            b.CheckOut,
            b.Adults,
            b.Children,
            b.RoomId,
            b.Room?.Name,
            b.SpecialRequests,
            b.Status,
            b.CreatedAt
        ));

        return Ok(dtos);
    }

    [HttpPatch("booking-requests/{id}/status")]
    public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] UpdateBookingStatusDto dto)
    {
        var booking = await _context.BookingRequests.FindAsync(id);
        if (booking == null)
        {
            return NotFound(new { message = "So'rov topilmadi" });
        }

        booking.Status = dto.Status;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Status yangilandi", status = booking.Status });
    }

    [HttpGet("contact-requests")]
    public async Task<ActionResult<IEnumerable<ContactRequestDto>>> GetContactRequests()
    {
        var contacts = await _context.ContactRequests
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();

        var dtos = contacts.Select(c => new ContactRequestDto(
            c.Id,
            c.FullName,
            c.Phone,
            c.Email,
            c.Message,
            c.CreatedAt
        ));

        return Ok(dtos);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var totalRooms = await _context.Rooms.CountAsync();
        var pendingBookings = await _context.BookingRequests.CountAsync(b => b.Status == "Yangi");
        var totalBookings = await _context.BookingRequests.CountAsync();
        var totalContacts = await _context.ContactRequests.CountAsync();

        return Ok(new
        {
            TotalRooms = totalRooms,
            PendingBookings = pendingBookings,
            TotalBookings = totalBookings,
            TotalContacts = totalContacts
        });
    }
}
