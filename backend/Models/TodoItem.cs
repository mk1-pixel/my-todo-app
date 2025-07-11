using backend.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("todos")]
    public class TodoItem
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("title")]
        public string? Title { get; set; }

        [Column("is_completed")]
        public bool IsCompleted { get; set; }

        [Column("created_date")]
        public DateTime? CreatedDate { get; set; }
        [Column("due_date")]
        public DateTime? DueDate{ get; set; }

        [Column("description")]
        public string? Description { get; set; } = string.Empty;

        [Column("priority")]
        public int Priority{ get; set; }

        [Column("todo_tags")]
        public ICollection<TodoTag> TodoTags { get; set; } = new List<TodoTag>();
    }
}
