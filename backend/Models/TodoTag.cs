namespace backend.Models
{
    public class TodoTag
    {
        public int TodoId { get; set; }
        public TodoItem TodoItem { get; set; }

        public int TagId {  get; set; }
        public Tags Tags { get; set; }

    }
}
