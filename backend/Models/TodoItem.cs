using backend.Models;
namespace backend.Models
{
    
    public class TodoItem
    {
        public int Id { get; set; } 
        public string? Title { get; set; }
        public bool IsCompleted { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? DueDate{ get; set; }

        public string? Description { get; set; } = string.Empty;

        public int Priority{ get; set; }

        public ICollection<TodoTag> TodoTags { get; set; } = new List<TodoTag>();
    }
}
