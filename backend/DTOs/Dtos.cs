namespace ResortBackend.DTOs;

public record AmenityDto(int Id, string Name, string Icon);

public record RoomImageDto(int Id, string ImageUrl, int SortOrder);

public record RoomDto(
    int Id,
    string Slug,
    string Name,
    string ShortDescription,
    string Description,
    decimal PricePerNight,
    int Area,
    int MaxGuests,
    int BaseAdults,
    int MaxChildren,
    int ExtraBedCount,
    string ViewType,
    string Status,
    string CoverImage,
    bool IsAvailable,
    bool IsFeatured,
    string CheckInTime,
    string CheckOutTime,
    List<RoomImageDto> Images,
    List<AmenityDto> Amenities
);

public record CreateRoomDto(
    string Slug,
    string Name,
    string ShortDescription,
    string Description,
    decimal PricePerNight,
    int Area,
    int MaxGuests,
    string ViewType,
    string Status,
    string CoverImage,
    bool IsFeatured,
    List<int> AmenityIds,
    List<string> ImageUrls
);

public record MenuItemDto(
    int Id,
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    string ImageUrl,
    bool IsAvailable,
    bool RequiresPreOrder,
    int SortOrder
);

public record CreateMenuItemDto(
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    string ImageUrl,
    bool IsAvailable,
    bool RequiresPreOrder,
    int SortOrder
);

public record SpaServiceDto(
    int Id,
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    int DurationMinutes,
    bool IncludedInStay,
    bool RequiresAppointment,
    string ImageUrl,
    int SortOrder
);

public record CreateSpaServiceDto(
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    int DurationMinutes,
    bool IncludedInStay,
    bool RequiresAppointment,
    string ImageUrl,
    int SortOrder
);

public record ActivityDto(
    int Id,
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    bool IncludedInStay,
    string Schedule,
    string Season,
    string ImageUrl,
    int SortOrder
);

public record CreateActivityDto(
    string Category,
    string Name,
    string Description,
    decimal Price,
    string Currency,
    bool IncludedInStay,
    string Schedule,
    string Season,
    string ImageUrl,
    int SortOrder
);

public record BlogPostDto(
    int Id,
    string Slug,
    string Title,
    string ShortDescription,
    string Content,
    string Category,
    string Author,
    DateTime PublishedAt,
    string ImageUrl,
    int ReadTimeMinutes,
    string MetaTitle,
    string MetaDescription,
    bool IsPublished
);

public record CreateBlogPostDto(
    string Slug,
    string Title,
    string ShortDescription,
    string Content,
    string Category,
    string Author,
    string ImageUrl,
    int ReadTimeMinutes,
    string MetaTitle,
    string MetaDescription,
    bool IsPublished
);

public record FaqItemDto(
    int Id,
    string Question,
    string Answer,
    string Category,
    int SortOrder,
    bool IsActive
);

public record CreateFaqItemDto(
    string Question,
    string Answer,
    string Category,
    int SortOrder,
    bool IsActive
);

public record InquiryDto(
    int Id,
    string Type,
    string FullName,
    string Phone,
    string Email,
    string? PreferredDate,
    int? GuestsCount,
    string? RoomTypeOrService,
    string Message,
    string Status,
    DateTime CreatedAt,
    string? AdminNotes
);

public record CreateInquiryDto(
    string Type,
    string FullName,
    string Phone,
    string Email,
    string? PreferredDate,
    int? GuestsCount,
    string? RoomTypeOrService,
    string Message
);

public record UpdateInquiryStatusDto(string Status, string? AdminNotes);

public record AvailabilityQueryDto(
    string? CheckIn,
    string? CheckOut,
    int Adults,
    int Children,
    string? ViewType
);

public record AvailableRoomDto(
    RoomDto Room,
    decimal TotalPrice,
    int NightsCount,
    bool IsAvailable
);

public record BookingSessionRequestDto(
    int RoomId,
    string CheckIn,
    string CheckOut,
    int Adults,
    int Children,
    string GuestName,
    string GuestPhone,
    string GuestEmail
);

public record BookingSessionResponseDto(
    string SessionId,
    string CheckoutUrl,
    decimal TotalAmount,
    string Currency,
    DateTime ExpiresAt
);

public record AdminDashboardStatsDto(
    int TotalRooms,
    int ActiveRooms,
    int TotalMenuItems,
    int TotalSpaServices,
    int TotalActivities,
    int TotalBlogPosts,
    int TotalFaqs,
    int TotalInquiries,
    int NewInquiriesCount,
    int WonInquiriesCount
);

public record CreateBookingRequestDto(
    string FullName,
    string Phone,
    string? Email,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Adults,
    int Children,
    int? RoomId,
    string? SpecialRequests
);

public record BookingRequestDto(
    int Id,
    string FullName,
    string Phone,
    string? Email,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Adults,
    int Children,
    int? RoomId,
    string? RoomName,
    string SpecialRequests,
    string Status,
    DateTime CreatedAt
);

public record UpdateBookingStatusDto(string Status);

public record CreateContactRequestDto(
    string FullName,
    string Phone,
    string? Email,
    string Message
);

public record ContactRequestDto(
    int Id,
    string FullName,
    string Phone,
    string? Email,
    string Message,
    DateTime CreatedAt
);
