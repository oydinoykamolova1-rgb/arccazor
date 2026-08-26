using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/health")]
[Route("api/v1/health")]
public class HealthController : ControllerBase
{
    private readonly ResortDbContext _context;

    public HealthController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetHealth()
    {
        try {
            var dbCanConnect = await _context.Database.CanConnectAsync();
            return Ok(new
            {
                status = "Healthy",
                timestamp = DateTime.UtcNow,
                database = dbCanConnect ? "Connected" : "Disconnected",
                version = "1.0.0-production-mvp"
            });
        }
        catch (Exception ex)
        {
            return StatusCode(503, new
            {
                status = "Unhealthy",
                timestamp = DateTime.UtcNow,
                error = ex.Message
            });
        }
    }
}
