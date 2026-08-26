using Microsoft.AspNetCore.Mvc;
using ResortBackend.Data;
using ResortBackend.DTOs;
using ResortBackend.Models;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/contact-requests")]
public class ContactRequestsController : ControllerBase
{
    private readonly ResortDbContext _context;

    public ContactRequestsController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<ContactRequestDto>> CreateContactRequest([FromBody] CreateContactRequestDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FullName) || string.IsNullOrWhiteSpace(dto.Phone) || string.IsNullOrWhiteSpace(dto.Message))
        {
            return BadRequest(new { message = "Ism, telefon va xabar to'liq kiritilishi shart" });
        }

        var contact = new ContactRequest
        {
            FullName = dto.FullName.Trim(),
            Phone = dto.Phone.Trim(),
            Email = dto.Email?.Trim(),
            Message = dto.Message.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        _context.ContactRequests.Add(contact);
        await _context.SaveChangesAsync();

        var responseDto = new ContactRequestDto(
            contact.Id,
            contact.FullName,
            contact.Phone,
            contact.Email,
            contact.Message,
            contact.CreatedAt
        );

        return CreatedAtAction(nameof(CreateContactRequest), new { id = contact.Id }, responseDto);
    }
}
