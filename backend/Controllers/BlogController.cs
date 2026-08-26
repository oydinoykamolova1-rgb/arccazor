using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/blog")]
[Route("api/blog")]
public class BlogController : ControllerBase
{
    private readonly ResortDbContext _context;

    public BlogController(ResortDbContext context)
    {
        _context = context;
    }

    [HttpGet("posts")]
    public async Task<ActionResult<IEnumerable<BlogPostDto>>> GetPosts([FromQuery] string? category)
    {
        var query = _context.BlogPosts.Where(b => b.IsPublished);

        if (!string.IsNullOrWhiteSpace(category) && category.ToLower() != "all")
        {
            query = query.Where(b => b.Category.ToLower() == category.ToLower());
        }

        var posts = await query
            .OrderByDescending(b => b.PublishedAt)
            .Select(b => new BlogPostDto(
                b.Id,
                b.Slug,
                b.Title,
                b.ShortDescription,
                b.Content,
                b.Category,
                b.Author,
                b.PublishedAt,
                b.ImageUrl,
                b.ReadTimeMinutes,
                b.MetaTitle,
                b.MetaDescription,
                b.IsPublished
            ))
            .ToListAsync();

        return Ok(posts);
    }

    [HttpGet("posts/{slug}")]
    public async Task<ActionResult<BlogPostDto>> GetPostBySlug(string slug)
    {
        var post = await _context.BlogPosts
            .FirstOrDefaultAsync(b => b.Slug.ToLower() == slug.ToLower() && b.IsPublished);

        if (post == null)
        {
            return NotFound(new { message = "Maqola topilmadi." });
        }

        var dto = new BlogPostDto(
            post.Id,
            post.Slug,
            post.Title,
            post.ShortDescription,
            post.Content,
            post.Category,
            post.Author,
            post.PublishedAt,
            post.ImageUrl,
            post.ReadTimeMinutes,
            post.MetaTitle,
            post.MetaDescription,
            post.IsPublished
        );

        return Ok(dto);
    }
}
