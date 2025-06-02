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
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos() => 
            await _context.Todos.ToListAsync();


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
            var newTodo = new TodoItem
            {
                Title = todo.Title,
                IsCompleted = false
            };
            _context.Todos.Add(newTodo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = newTodo.Id}, newTodo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, TodoItem todo)
        {
            if(id != todo.Id) return BadRequest();
            if(todo.IsCompleted == true)
            {
                todo.IsCompleted = false;
            } else
            {
                todo.IsCompleted = true;
            }
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
