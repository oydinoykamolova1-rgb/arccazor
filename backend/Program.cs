using Microsoft.EntityFrameworkCore;
using ResortBackend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHealthChecks();

// Configure Database Connection
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=resort.db";
builder.Services.AddDbContext<ResortDbContext>(options =>
    options.UseSqlite(connectionString));

// CORS Policy
var allowedOrigins = builder.Configuration["AllowedOrigins"]
    ?? "http://localhost:3000,http://localhost:3001,https://archazor.vercel.app";

var originsArray = allowedOrigins
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(originsArray)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Auto Migrate & Seed DB
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ResortDbContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// HTTP request pipeline
app.UseExceptionHandler();
app.UseStatusCodePages();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

app.Run();
