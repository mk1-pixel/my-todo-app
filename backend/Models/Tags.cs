using backend.Models;
namespace backend.Models
{
    public class Tags
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<TodoItem> Todos { get; set; } =new();
    }
}
