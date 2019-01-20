using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime DateOfWashing { get; set; }
        public DateTime? RecordTimestamp { get; set; }
        public DateTime? RecordTimestampStart { get; set; }
        public DateTime? RecordTimestampFinish { get; set; }

        public ReservationStatus ReservationStatus { get; set; }
        public int ReservationStatusId { get; set; }

        public Period Period { get; set; }
        public int PeriodId { get; set; }

        public WashingRoom WashingRoom { get; set; }
        public int WashingRoomId { get; set; }
        public int WashingMachineCount { get; set; }

        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }

    }
}
