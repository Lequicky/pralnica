using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class AddReservationDto
    {
        public int PeriodId { get; set; }

        public string Date { get; set; }

        public string UserId { get; set; }

        public int WashingMachineCount { get; set; }
        public int RoomId { get; set; }
    }
}
