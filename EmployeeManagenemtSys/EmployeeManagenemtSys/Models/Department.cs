using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagenemtSys.Models
{
    public class Department
    {
        [Key]
        public int Dept_Id { get; set; }
        public string DeptName { get; set; }
        public string Description { get; set; }

    }
}
