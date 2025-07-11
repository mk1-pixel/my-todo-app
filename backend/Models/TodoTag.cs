using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("todo_tags")]
    public class TodoTag
    {
        [Key]
        [Column("todo_id ")]
        public int TodoId { get; set; }
        [Column("todo_item")]
        public TodoItem TodoItem { get; set; }
        [Column("tag_id")]
        public int TagId {  get; set; }
        [Column("tags")]
        public Tags Tags { get; set; }

    }
}
