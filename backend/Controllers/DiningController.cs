using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/dining")]
[Route("api/dining")]
public class DiningController : ControllerBase
{
    private readonly ResortDbContext _context;

    public DiningController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet("menu")]
    public async Task<ActionResult<IEnumerable<MenuItemDto>>> GetMenu([FromQuery] string? category)
    {
        var query = _context.MenuItems.AsQueryable();

        if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all" && category.ToLower() != "barchasi")
        {
            query = query.Where(m => m.Category.ToLower() == category.ToLower());
        }

        var items = await query
            .Where(m => m.IsAvailable)
            .OrderBy(m => m.SortOrder)
            .Select(m => new MenuItemDto(
                m.Id,
                m.Category,
                m.Name,
                m.Description,
                m.Price,
                m.Currency,
                m.ImageUrl,
                m.IsAvailable,
                m.RequiresPreOrder,
                m.SortOrder
            ))
            .ToListAsync();

        return Ok(items);
    }
}
