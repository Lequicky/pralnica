using Api.Entities;
using Api.Models;
using Api.Models.User;
using Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private IPralnicaRepository _repository;
        //private IPasswordHasher<AppUser> _hasher;
        private UserManager<AppUser> _userManager;
        private IServiceProvider _service;
        

        public UserController(IPralnicaRepository pralnicaRepository, UserManager<AppUser> userManager, IServiceProvider service)
        {
            _repository = pralnicaRepository;
            //_hasher = hasher;
            _userManager = userManager;
            _service = service;
    
        }

        
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var usersFromRepo = _repository.GetUsers();

            return Ok(usersFromRepo);
        }

        
        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            var rolesFromRepo = _repository.GetRoles();

            return Ok(rolesFromRepo);
        }
        [AllowAnonymous]
        [HttpPost("reset")]
        public async Task<IActionResult> resetPassowrd([FromBody] PasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user != null)
            {
                var result = await _userManager.ChangePasswordAsync(user, model.PasswordNow,model.PasswordAfter);
                if (!result.Succeeded)
                {
                    return BadRequest();
                }
            }
            else
            {
                return NotFound();
            }

            return Ok();

        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = Mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            var RoleManager = _service.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = _service.GetRequiredService<UserManager<AppUser>>();
            if (!result.Succeeded) return BadRequest();
            var role = await _userManager.AddToRoleAsync(userIdentity, "Student");
            if (!role.Succeeded) return BadRequest();



            //await _appDbContext.JobSeekers.AddAsync(new JobSeeker { IdentityId = userIdentity.Id, Location = model.Location });
            // await _appDbContext.SaveChangesAsync();

            return new OkResult();

        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if(user != null && await _userManager.CheckPasswordAsync(user, model.Password) && !user.Deleted && user.IsAllowed)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var claims = await GetValidClaims(user);
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("test"));

                var token = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "http://localhost:4200",
                    expires: DateTime.UtcNow.AddHours(15),
                    claims: claims,
                    signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)

                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    roles = userRoles,
                    user_id = user.Id,
                    role = userRoles[0],
                    img = user.ImageUrl
                });
            }
            return Unauthorized();
        }


        private async Task<List<Claim>> GetValidClaims(AppUser user)
        {
            IdentityOptions _options = new IdentityOptions();
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            //new Claim(JwtRegisteredClaimNames.Iat, ToUnixEpochDate(_jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64),
            new Claim(_options.ClaimsIdentity.UserIdClaimType, user.Id.ToString()),
            new Claim(_options.ClaimsIdentity.UserNameClaimType, user.UserName)
        };
            var userClaims = await _userManager.GetClaimsAsync(user);
            var userRoles = await _userManager.GetRolesAsync(user);
            claims.AddRange(userClaims);
            
            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));


            }
            //foreach (var userRole in userRoles)
            //{
            //    claims.Add(new Claim(ClaimTypes.Role, userRole));
            //    var role = await _roleManager.FindByNameAsync(userRole);
            //    if (role != null)
            //    {
                    
            //        var roleClaims = await _roleManager.GetClaimsAsync(role);
            //        foreach (Claim roleClaim in roleClaims)
            //        {
            //            claims.Add(roleClaim);
            //        }
            //    }
            //}
            return claims;
        }

    }
}
