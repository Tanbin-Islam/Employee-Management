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
    public class PayRollsController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public PayRollsController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: api/PayRolls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayRoll>>> GetpayRolls()
        {
            return await _context.payRolls.ToListAsync();
        }

        // GET: api/PayRolls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayRoll>> GetPayRoll(int id)
        {
            var payRoll = await _context.payRolls.FindAsync(id);

            if (payRoll == null)
            {
                return NotFound();
            }

            return payRoll;
        }

        // PUT: api/PayRolls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayRoll(int id, PayRoll payRoll)
        {
            if (id != payRoll.RollId)
            {
                return BadRequest();
            }

            _context.Entry(payRoll).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayRollExists(id))
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

        // POST: api/PayRolls
        [HttpPost]
        public async Task<ActionResult<PayRoll>> PostPayRoll(PayRoll payRoll)
        {
            _context.payRolls.Add(payRoll);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayRoll", new { id = payRoll.RollId }, payRoll);
        }

        // DELETE: api/PayRolls/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PayRoll>> DeletePayRoll(int id)
        {
            var payRoll = await _context.payRolls.FindAsync(id);
            if (payRoll == null)
            {
                return NotFound();
            }

            _context.payRolls.Remove(payRoll);
            await _context.SaveChangesAsync();

            return payRoll;
        }

        private bool PayRollExists(int id)
        {
            return _context.payRolls.Any(e => e.RollId == id);
        }
    }
}
