namespace backend.Dtos
{
    public class TodoDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";

        public List<string> Tags { get; set; } = new();
    }
}
