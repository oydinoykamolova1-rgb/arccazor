using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;
using ResortBackend.DTOs;
using ResortBackend.Models;

namespace ResortBackend.Controllers;

[ApiController]
[Route("api/v1/admin")]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly ResortDbContext _context;

    public AdminController(ResortDbContext context)
    {
        _context = context;
    }

    // STATS
    [HttpGet("stats")]
    public async Task<ActionResult<AdminDashboardStatsDto>> GetStats()
    {
        var totalRooms = await _context.Rooms.CountAsync();
        var activeRooms = await _context.Rooms.CountAsync(r => r.Status == "Active");
        var totalMenuItems = await _context.MenuItems.CountAsync();
        var totalSpaServices = await _context.SpaServices.CountAsync();
        var totalActivities = await _context.Activities.CountAsync();
        var totalBlogPosts = await _context.BlogPosts.CountAsync();
        var totalFaqs = await _context.FaqItems.CountAsync();
        var totalInquiries = await _context.Inquiries.CountAsync();
        var newInquiriesCount = await _context.Inquiries.CountAsync(i => i.Status == "New");
        var wonInquiriesCount = await _context.Inquiries.CountAsync(i => i.Status == "Won");

        return Ok(new AdminDashboardStatsDto(
            totalRooms,
            activeRooms,
            totalMenuItems,
            totalSpaServices,
            totalActivities,
            totalBlogPosts,
            totalFaqs,
            totalInquiries,
            newInquiriesCount,
            wonInquiriesCount
        ));
    }

    // INQUIRIES / CRM LEADS
    [HttpGet("inquiries")]
    public async Task<ActionResult<IEnumerable<InquiryDto>>> GetInquiries([FromQuery] string? status, [FromQuery] string? type)
    {
        var query = _context.Inquiries.AsQueryable();

        if (!string.IsNullOrWhiteSpace(status) && status != "all")
        {
            query = query.Where(i => i.Status.ToLower() == status.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(type) && type != "all")
        {
            query = query.Where(i => i.Type.ToLower() == type.ToLower());
        }

        var inquiries = await query.OrderByDescending(i => i.CreatedAt).ToListAsync();

        var dtos = inquiries.Select(i => new InquiryDto(
            i.Id,
            i.Type,
            i.FullName,
            i.Phone,
            i.Email,
            i.PreferredDate,
            i.GuestsCount,
            i.RoomTypeOrService,
            i.Message,
            i.Status,
            i.CreatedAt,
            i.AdminNotes
        ));

        return Ok(dtos);
    }

    [HttpPatch("inquiries/{id}/status")]
    public async Task<IActionResult> UpdateInquiryStatus(int id, [FromBody] UpdateInquiryStatusDto dto)
    {
        var inquiry = await _context.Inquiries.FindAsync(id);
        if (inquiry == null) return NotFound(new { message = "Murojaat topilmadi." });

        inquiry.Status = dto.Status;
        if (!string.IsNullOrWhiteSpace(dto.AdminNotes))
        {
            inquiry.AdminNotes = dto.AdminNotes;
        }

        await _context.SaveChangesAsync();
        return Ok(new { message = "Status yangilandi", status = inquiry.Status });
    }

    // ROOMS CRUD
    [HttpPost("rooms")]
    public async Task<ActionResult<RoomDto>> CreateRoom([FromBody] CreateRoomDto dto)
    {
        var room = new Room
        {
            Slug = dto.Slug,
            Name = dto.Name,
            ShortDescription = dto.ShortDescription,
            Description = dto.Description,
            PricePerNight = dto.PricePerNight,
            Area = dto.Area,
            MaxGuests = dto.MaxGuests,
            ViewType = dto.ViewType,
            Status = dto.Status ?? "Active",
            CoverImage = dto.CoverImage,
            IsFeatured = dto.IsFeatured,
            IsAvailable = true
        };

        _context.Rooms.Add(room);
        await _context.SaveChangesAsync();

        if (dto.ImageUrls != null)
        {
            int order = 1;
            foreach (var url in dto.ImageUrls)
            {
                _context.RoomImages.Add(new RoomImage { RoomId = room.Id, ImageUrl = url, SortOrder = order++ });
            }
        }

        if (dto.AmenityIds != null)
        {
            foreach (var aid in dto.AmenityIds)
            {
                _context.RoomAmenities.Add(new RoomAmenity { RoomId = room.Id, AmenityId = aid });
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new { message = "Xona yaratildi", id = room.Id });
    }

    // MENU ITEMS CRUD
    [HttpPost("menu-items")]
    public async Task<ActionResult<MenuItemDto>> CreateMenuItem([FromBody] CreateMenuItemDto dto)
    {
        var item = new MenuItem
        {
            Category = dto.Category,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Currency = dto.Currency,
            ImageUrl = dto.ImageUrl,
            IsAvailable = dto.IsAvailable,
            RequiresPreOrder = dto.RequiresPreOrder,
            SortOrder = dto.SortOrder
        };

        _context.MenuItems.Add(item);
        await _context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpDelete("menu-items/{id}")]
    public async Task<IActionResult> DeleteMenuItem(int id)
    {
        var item = await _context.MenuItems.FindAsync(id);
        if (item == null) return NotFound();
        _context.MenuItems.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // SPA SERVICES CRUD
    [HttpPost("spa-services")]
    public async Task<ActionResult<SpaServiceDto>> CreateSpaService([FromBody] CreateSpaServiceDto dto)
    {
        var service = new SpaService
        {
            Category = dto.Category,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Currency = dto.Currency,
            DurationMinutes = dto.DurationMinutes,
            IncludedInStay = dto.IncludedInStay,
            RequiresAppointment = dto.RequiresAppointment,
            ImageUrl = dto.ImageUrl,
            SortOrder = dto.SortOrder
        };

        _context.SpaServices.Add(service);
        await _context.SaveChangesAsync();

        return Ok(service);
    }

    [HttpDelete("spa-services/{id}")]
    public async Task<IActionResult> DeleteSpaService(int id)
    {
        var service = await _context.SpaServices.FindAsync(id);
        if (service == null) return NotFound();
        _context.SpaServices.Remove(service);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // ACTIVITIES CRUD
    [HttpPost("activities")]
    public async Task<ActionResult<ActivityDto>> CreateActivity([FromBody] CreateActivityDto dto)
    {
        var activity = new Activity
        {
            Category = dto.Category,
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Currency = dto.Currency,
            IncludedInStay = dto.IncludedInStay,
            Schedule = dto.Schedule,
            Season = dto.Season,
            ImageUrl = dto.ImageUrl,
            SortOrder = dto.SortOrder
        };

        _context.Activities.Add(activity);
        await _context.SaveChangesAsync();

        return Ok(activity);
    }

    [HttpDelete("activities/{id}")]
    public async Task<IActionResult> DeleteActivity(int id)
    {
        var act = await _context.Activities.FindAsync(id);
        if (act == null) return NotFound();
        _context.Activities.Remove(act);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // BLOG POSTS CRUD
    [HttpPost("blog-posts")]
    public async Task<ActionResult<BlogPostDto>> CreateBlogPost([FromBody] CreateBlogPostDto dto)
    {
        var post = new BlogPost
        {
            Slug = dto.Slug,
            Title = dto.Title,
            ShortDescription = dto.ShortDescription,
            Content = dto.Content,
            Category = dto.Category,
            Author = dto.Author,
            ImageUrl = dto.ImageUrl,
            ReadTimeMinutes = dto.ReadTimeMinutes,
            MetaTitle = dto.MetaTitle,
            MetaDescription = dto.MetaDescription,
            IsPublished = dto.IsPublished,
            PublishedAt = DateTime.UtcNow
        };

        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [HttpDelete("blog-posts/{id}")]
    public async Task<IActionResult> DeleteBlogPost(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // FAQ ITEMS CRUD
    [HttpPost("faqs")]
    public async Task<ActionResult<FaqItemDto>> CreateFaq([FromBody] CreateFaqItemDto dto)
    {
        var faq = new FaqItem
        {
            Question = dto.Question,
            Answer = dto.Answer,
            Category = dto.Category,
            SortOrder = dto.SortOrder,
            IsActive = dto.IsActive
        };

        _context.FaqItems.Add(faq);
        await _context.SaveChangesAsync();

        return Ok(faq);
    }

    [HttpDelete("faqs/{id}")]
    public async Task<IActionResult> DeleteFaq(int id)
    {
        var faq = await _context.FaqItems.FindAsync(id);
        if (faq == null) return NotFound();
        _context.FaqItems.Remove(faq);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DEPRECATED LEGACY ENDPOINTS SUPPORT
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
        if (booking == null) return NotFound(new { message = "So'rov topilmadi" });

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
}
