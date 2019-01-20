using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class MonthReport
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string RoomNumber { get; set; }
        public int WashingMachineCount { get; set; }
        public string  Tip { get; set; }
    }
}
