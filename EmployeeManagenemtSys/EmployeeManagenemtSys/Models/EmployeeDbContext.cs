using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagenemtSys.Models
{
    public class EmployeeDbContext: DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> employees { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<PayRoll> payRolls { get; set; }
        public DbSet<Department> departments { get; set; }
        public DbSet<Position> positions { get; set; }


    }
}
