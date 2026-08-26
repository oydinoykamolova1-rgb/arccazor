using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/spa")]
[Route("api/spa")]
public class SpaController : ControllerBase
{
    private readonly ResortDbContext _context;

    public SpaController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet("services")]
    public async Task<ActionResult<IEnumerable<SpaServiceDto>>> GetServices([FromQuery] string? category)
    {
        var query = _context.SpaServices.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all")
        {
            query = query.Where(s => s.Category.ToLower() == category.ToLower());
        }

        var services = await query
            .OrderBy(s => s.SortOrder)
            .Select(s => new SpaServiceDto(
                s.Id,
                s.Category,
                s.Name,
                s.Description,
                s.Price,
                s.Currency,
                s.DurationMinutes,
                s.IncludedInStay,
                s.RequiresAppointment,
                s.ImageUrl,
                s.SortOrder
            ))
            .ToListAsync();

        return Ok(services);
    }
}
