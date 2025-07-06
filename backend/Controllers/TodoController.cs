using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;
using AutoMapper;
using backend.Dtos;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly IMapper _mapper;

        public TodoController(TodoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<TodoItem>> GetTodos() {
            var todos = await _context.Todos.Select(t => new TodoItem {
                Id = t.Id,
                Title = t.Title,
                IsCompleted = t.IsCompleted,
                CreatedDate = t.CreatedDate,
                DueDate = t.DueDate,
                Description = t.Description,
                Priority = t.Priority
            }).ToListAsync();
            return Ok(todos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoDto>> GetTodo(int id)
        {
            //var todo = await _context.Todos
            //    .Include(t =>  t.TodoTags)
            //    .ThenInclude(tt => tt.Tags)
            //    .FirstOrDefaultAsync(t => t.Id == id);
            var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id);
            if (todo == null) return NotFound();

            var dto = new TodoDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Tags = todo.TodoTags
                    ?.Where(tt => tt.Tags != null)
                    .Select(tt => tt.Tags.Name)
                    .ToList()
            };
            return dto;
     }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo([FromBody]TodoItem todo)
        {
            DateTime aWeekLater= DateTime.Now.AddDays(7);
            
            var newTodo = new TodoItem
            {
                Title = todo.Title,
                IsCompleted = false,
                CreatedDate = todo.CreatedDate,
                DueDate = todo.DueDate,
                Description = "",
                Priority = 1
            };
            _context.Todos.Add(newTodo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = newTodo.Id}, newTodo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem todo)
        {
            if(id != todo.Id) return BadRequest();
            
            _context.Entry(todo).State = EntityState.Modified;
            
            try
            {
            await _context.SaveChangesAsync();

            } catch (Exception ex)
            {
                return NotFound(new {message = "Error", ex = ex});
            }
            return Ok(new {message = "成功", todo});
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if(todo == null) return NotFound();
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
