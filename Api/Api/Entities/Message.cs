using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class Message
    {
        public int MessageId { get; set; }
        public string MessageText { get; set; }
        public DateTime? RecordTimeStamp { get; set; }
        public string IdentityId { get; set; }
        public AppUser Identity { get; set; }

    }
}
