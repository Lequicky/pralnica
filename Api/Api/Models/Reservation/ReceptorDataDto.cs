using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class ReceptorDataDto
    {
        public string ReservationId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string PeriodName { get; set; }
        public int WashingMachineCount { get; set; }
        public string WashingRoomName { get; set; }
        public bool StartStatus { get; set; }
        public bool EndStatus { get; set; }
        public string ImageUrl { get; set; }

    }
}
