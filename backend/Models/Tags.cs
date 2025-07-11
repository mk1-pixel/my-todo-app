using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    [Table("tags")]
    public class Tags
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<TodoTag> TodoTags { get; set; } = new List<TodoTag>();
    }
}
