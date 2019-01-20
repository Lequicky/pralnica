using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class UserMonthReservations
    {
        public int Id { get; set; }
        public string DateOfWashing { get; set; }
        public string PeriodName { get; set; }
        public string WashingRoomName { get; set; }
        public int WashingMachineCount { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string RoomNumber { get; set; }
    }
}
