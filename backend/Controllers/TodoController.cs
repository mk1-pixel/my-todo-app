using backend.Data;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Any;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;
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
            // await _context.Todos.ToListAsync();
            



        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if(todo == null) return NotFound();
            return todo;
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
