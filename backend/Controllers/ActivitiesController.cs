using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/activities")]
[Route("api/activities")]
public class ActivitiesController : ControllerBase
{
    private readonly ResortDbContext _context;

    public ActivitiesController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> GetActivities([FromQuery] string? season)
    {
        var query = _context.Activities.AsQueryable();

        if (!string.IsNullOrWhiteSpace(season) && season.ToLower() != "all")
        {
            query = query.Where(a => a.Season.ToLower() == season.ToLower() || a.Season.ToLower() == "all");
        }

        var activities = await query
            .OrderBy(a => a.SortOrder)
            .Select(a => new ActivityDto(
                a.Id,
                a.Category,
                a.Name,
                a.Description,
                a.Price,
                a.Currency,
                a.IncludedInStay,
                a.Schedule,
                a.Season,
                a.ImageUrl,
                a.SortOrder
            ))
            .ToListAsync();

        return Ok(activities);
    }
}
