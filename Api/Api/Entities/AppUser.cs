using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RoomNumber { get; set; }
        public bool IsAllowed { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool Deleted { get; set; }
        public string ImageUrl { get; set; }

    }
}
