using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{
    public class PasswordModel
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserId { get; set; }
        [Required(ErrorMessage = "Password now is required")]
        public string PasswordNow { get; set; }
        [Required(ErrorMessage = "Password after is required")]
        public string PasswordAfter { get; set; }
    }
}
