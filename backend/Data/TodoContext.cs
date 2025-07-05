using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> Todos { get; set; }

        public DbSet<Tags> Tags { get; set; }

        public DbSet<TodoTag> TodoTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<TodoTag>().HasKey(tt => new {tt.TodoId, tt.TagId});

            modelBuilder.Entity<TodoTag>().HasOne(tt => tt.TodoItem).WithMany(t => t.TodoTags).HasForeignKey(tt => tt.TodoId);

            modelBuilder.Entity<TodoTag>().HasOne(tt => tt.Tags).WithMany(t => t.TodoTags).HasForeignKey(tt => tt.TagId);

        }

    }


}
