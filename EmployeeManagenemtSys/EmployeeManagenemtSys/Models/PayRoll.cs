using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagenemtSys.Models
{
    public class PayRoll
    {
        [Key]
        public int RollId { get; set; }
        public string RollName { get; set; }
    }
}
