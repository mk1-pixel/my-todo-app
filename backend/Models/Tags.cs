using backend.Models;
using System.ComponentModel.DataAnnotations.Schema;
namespace backend.Models
{
    [Table("tags")]
    public class Tags
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
        [Column("todo_tags")]
        public ICollection<TodoTag> TodoTags { get; set; } = new List<TodoTag>();
    }
}
