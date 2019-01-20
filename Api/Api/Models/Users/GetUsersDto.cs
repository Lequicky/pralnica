using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Users
{
    public class GetUsersDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string RoomNumber { get; set; }
        public bool IsAllowed { get; set; }
        public string imageUrl { get; set; }

    }
}
