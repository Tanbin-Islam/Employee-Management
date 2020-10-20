using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagenemtSys.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string EmployeeName { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(500)")]
        public string Address { get; set; }
        public string Email { get; set; }
        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Phone { get; set; }
        public string Role { get; set; }
    }
}
