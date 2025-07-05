using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Dtos;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class TagsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TagsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/<TagsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tags>>> GetTags()
        {
            var tags = await _context.Tags.Select(t => new Tags
            {
                Id = t.Id,
                Name = t.Name,
            }).ToListAsync();
            return Ok(tags);
        }

        // GET api/<TagsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TagsController>
        [HttpPost]
        //public async Task<IActionResult> AddTagToTodo(int todoId, [FromBody] TagRequestDto request)
        public async Task<IActionResult> AddTagToTodo([FromBody] string tagName)
        {
            Console.WriteLine(tagName);
            //if (string.IsNullOrWhiteSpace(request.TagName))
            //{
            //    return BadRequest("タグ名を入力して下さ。");
            //}
            //var todo = await _context.Todos
            //    .Include(t => t.TodoTags)
            //    .FirstOrDefaultAsync(t => t.Id == todoId);


            return Ok(new {message = "タグが追加されました。"});
        }

        // DELETE api/<TagsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
