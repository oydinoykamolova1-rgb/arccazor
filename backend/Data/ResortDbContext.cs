using Microsoft.EntityFrameworkCore;
using ResortBackend.Models;

namespace ResortBackend.Data;

public class ResortDbContext : DbContext
{
    public ResortDbContext(DbContextOptions<ResortDbContext> options) : base(options)
    {
    }

    public DbSet<Room> Rooms => Set<Room>();
    public DbSet<RoomImage> RoomImages => Set<RoomImage>();
    public DbSet<Amenity> Amenities => Set<Amenity>();
    public DbSet<RoomAmenity> RoomAmenities => Set<RoomAmenity>();
    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();
    public DbSet<BookingRequest> BookingRequests => Set<BookingRequest>();
    public DbSet<MenuItem> MenuItems => Set<MenuItem>();
    public DbSet<SpaService> SpaServices => Set<SpaService>();
    public DbSet<Activity> Activities => Set<Activity>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<FaqItem> FaqItems => Set<FaqItem>();
    public DbSet<Inquiry> Inquiries => Set<Inquiry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RoomAmenity>()
            .HasKey(ra => new { ra.RoomId, ra.AmenityId });

        modelBuilder.Entity<RoomAmenity>()
            .HasOne(ra => ra.Room)
            .WithMany(r => r.RoomAmenities)
            .HasForeignKey(ra => ra.RoomId);

        modelBuilder.Entity<RoomAmenity>()
            .HasOne(ra => ra.Amenity)
            .WithMany(a => a.RoomAmenities)
            .HasForeignKey(ra => ra.AmenityId);

        modelBuilder.Entity<RoomImage>()
            .HasOne(ri => ri.Room)
            .WithMany(r => r.Images)
            .HasForeignKey(ri => ri.RoomId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<BookingRequest>()
            .HasOne(b => b.Room)
            .WithMany()
            .HasForeignKey(b => b.RoomId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
