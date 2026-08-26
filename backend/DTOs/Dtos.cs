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
    string ViewType,
    string CoverImage,
    bool IsAvailable,
    List<RoomImageDto> Images,
    List<AmenityDto> Amenities
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
