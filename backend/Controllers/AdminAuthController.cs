using Microsoft.AspNetCore.Mvc;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/admin/auth")]
[Route("api/admin/auth")]
public class AdminAuthController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public AdminAuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public record AdminLoginDto(string Username, string Password);
    public record AdminAuthResponseDto(bool Success, string Token, string Message);

    [HttpPost("login")]
    public IActionResult Login([FromBody] AdminLoginDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new { message = "Foydalanuvchi nomi va parol kiritilishi shart." });
        }

        var adminUser = _configuration["AdminSeed:Username"] ?? "admin@archazor.uz";
        var adminPass = _configuration["AdminSeed:Password"] ?? "ArchazorAdmin2026!";

        if (dto.Username.Trim().ToLower() == adminUser.ToLower() && dto.Password == adminPass)
        {
            var token = "token_" + Guid.NewGuid().ToString("N");
            return Ok(new AdminAuthResponseDto(true, token, "Tizimga muvaffaqiyatli kirdingiz."));
        }

        return Unauthorized(new { message = "Foydalanuvchi nomi yoki parol noto'g'ri." });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(new { message = "Tizimdan chiqildi." });
    }

    [HttpGet("me")]
    public IActionResult Me([FromHeader(Name = "Authorization")] string? authHeader)
    {
        if (string.IsNullOrWhiteSpace(authHeader) || !authHeader.StartsWith("Bearer token_"))
        {
            return Unauthorized(new { message = "Avtorizatsiyadan o'tilmagan." });
        }

        return Ok(new { username = "admin@archazor.uz", role = "SuperAdmin" });
    }
}
