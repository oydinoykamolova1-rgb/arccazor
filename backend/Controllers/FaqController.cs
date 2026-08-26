using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/faqs")]
[Route("api/faqs")]
public class FaqController : ControllerBase
{
    private readonly ResortDbContext _context;

    public FaqController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<FaqItemDto>>> GetFaqs([FromQuery] string? category)
    {
        var query = _context.FaqItems.Where(f => f.IsActive);

        if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all")
        {
            query = query.Where(f => f.Category.ToLower() == category.ToLower());
        }

        var faqs = await query
            .OrderBy(f => f.SortOrder)
            .Select(f => new FaqItemDto(
                f.Id,
                f.Question,
                f.Answer,
                f.Category,
                f.SortOrder,
                f.IsActive
            ))
            .ToListAsync();

        return Ok(faqs);
    }
}
