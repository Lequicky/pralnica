using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class AvailableWashingRoomDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public int WashingMachineCount { get; set; }
        public int RoomId { get; set; }
    }
}
