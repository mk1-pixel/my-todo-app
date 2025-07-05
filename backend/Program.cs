using backend.Data;
using backend.Mappings;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ✅ CORS ポリシーを登録
builder.Services.AddCors(options =>
{
    if (builder.Environment.IsDevelopment())
    {
        // ✅ 開発環境：すべて許可（ローカルなど）
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    }
    else
    {
        // ✅ 本番環境：指定オリジンのみ許可
        var frontendOrigin = "https://my-todo-frontend.onrender.com";

        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.SetIsOriginAllowed(origin => origin == frontendOrigin)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
    }
});

// ✅ ポート設定
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// ✅ DB 接続
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

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

// ✅ CORS（コントローラより前）
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();
