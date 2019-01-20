using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class WashingRoom
    {
        public int Id { get; set; }

        public string Code { get; set; }
        public string Name { get; set; }
        public int WashingMachineCount { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }
    }
}
