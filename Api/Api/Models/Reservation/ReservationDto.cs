using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Reservation
{
    public class ReservationDto
    {

        public DateTime datum { get; set; }
        public int period_id { get; set; }
        public string period_code { get; set; }
        public string period_name { get; set; }
        public DateTime period_start { get; set; }
        public DateTime period_end { get; set; }
        public bool reserved { get; set; }
        public string user_last_first_name { get; set; }
        public string user_id { get; set; }
        public string datum_string { get; set; }

    }
}
