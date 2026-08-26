using Microsoft.AspNetCore.Mvc;
using ResortBackend.Data;
using ResortBackend.DTOs;
using ResortBackend.Models;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/inquiries")]
[Route("api/inquiries")]
public class InquiriesController : ControllerBase
{
    private readonly ResortDbContext _context;

    public InquiriesController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<InquiryDto>> CreateInquiry([FromBody] CreateInquiryDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var inquiry = new Inquiry
        {
            Type = string.IsNullOrWhiteSpace(dto.Type) ? "GeneralContact" : dto.Type,
            FullName = dto.FullName,
            Phone = dto.Phone,
            Email = dto.Email ?? string.Empty,
            PreferredDate = dto.PreferredDate,
            GuestsCount = dto.GuestsCount,
            RoomTypeOrService = dto.RoomTypeOrService,
            Message = dto.Message,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };

        _context.Inquiries.Add(inquiry);
        await _context.SaveChangesAsync();

        var resultDto = new InquiryDto(
            inquiry.Id,
            inquiry.Type,
            inquiry.FullName,
            inquiry.Phone,
            inquiry.Email,
            inquiry.PreferredDate,
            inquiry.GuestsCount,
            inquiry.RoomTypeOrService,
            inquiry.Message,
            inquiry.Status,
            inquiry.CreatedAt,
            inquiry.AdminNotes
        );

        return CreatedAtAction(nameof(CreateInquiry), new { id = inquiry.Id }, resultDto);
    }
}
