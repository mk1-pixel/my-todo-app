using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("todo_tags")]
    public class TodoTag
    {
        public int TodoId { get; set; }
        public TodoItem TodoItem { get; set; }

        public int TagId {  get; set; }
        public Tags Tags { get; set; }

    }
}
