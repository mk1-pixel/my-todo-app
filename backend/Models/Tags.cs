using backend.Models;
namespace backend.Models
{
    public class Tags
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<TodoTag> TodoTags { get; set; } = new List<TodoTag>();
    }
}
