using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.WashingRoom
{
    public class GetWashingRoomDto
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int WashingMachineCount { get; set; }
        public bool IsActive { get; set; }
    }
}
