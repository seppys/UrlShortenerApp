using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbServices(builder.Configuration);
builder.Services.AddDiServices();

var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
