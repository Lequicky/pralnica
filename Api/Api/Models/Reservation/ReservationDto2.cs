using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class ReservationDto2
    {
        public string Datum { get; set; }
        public int period_id { get; set; }
        public string PeriodCode { get; set; }
        public string Period_name { get; set; }
        public string Period_start { get; set; }
        public string Period_end { get; set; }
        public bool Reserved { get; set; }
        public string User_last_first_name { get; set; }
        public string User_id { get; set; }
        public string Datum_string { get; set; }
    }
}
