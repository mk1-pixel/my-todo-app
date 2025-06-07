using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ 開発／本番で URL を切り替える
var frontendOrigin = builder.Environment.IsDevelopment()
    ? "http://localhost:3000"
    : "https://my-todo-frontend.onrender.com";

// ✅ CORS ポリシーを一貫して登録
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ✅ ポート設定（builder.Build の前）
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ✅ DB 接続
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ 自動マイグレーション
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TodoContext>();
    db.Database.Migrate();
}

// ✅ Swagger（開発のみ）
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ CORS（Swaggerより後、Controllersより前）
app.UseCors("AllowFrontend");

// 🔽 HTTPS Redirection は無効化しても可（Render 側でやるので）
// app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();

app.Run();
