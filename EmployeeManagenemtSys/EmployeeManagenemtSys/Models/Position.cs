using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagenemtSys.Models
{
    public class Position
    {
        [Key]
        public int PstId { get; set; }
        public string PtsTitle { get; set; }
        [ForeignKey("Department")]
        public int Dept_Id { get; set; }
        public Department Department { get; set; }
        public string Description { get; set; }

    }
}
