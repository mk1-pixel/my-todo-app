using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> Todos { get; set; }
    }
}
