using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagenemtSys.Models;

namespace EmployeeManagenemtSys.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public PositionsController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Positions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Position>>> Getpositions()
        {
            return await _context.positions.Include("Department").ToListAsync();
        }

        // GET: api/Positions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Position>> GetPosition(int id)
        {
            var position = await _context.positions.Include("Department").FirstOrDefaultAsync(opt => opt.PstId == id);

            if (position == null)
            {
                return NotFound();
            }

            return position;
        }

        // PUT: api/Positions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosition(int id, Position position)
        {
            if (id != position.PstId)
            {
                return BadRequest();
            }

            _context.Entry(position).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Positions
        [HttpPost]
        public async Task<ActionResult<Position>> PostPosition(Position position)
        {
            _context.positions.Add(position);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosition", new { id = position.PstId }, position);
        }

        // DELETE: api/Positions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Position>> DeletePosition(int id)
        {
            var position = await _context.positions.FindAsync(id);
            if (position == null)
            {
                return NotFound();
            }

            _context.positions.Remove(position);
            await _context.SaveChangesAsync();

            return position;
        }

        private bool PositionExists(int id)
        {
            return _context.positions.Any(e => e.PstId == id);
        }
    }
}
