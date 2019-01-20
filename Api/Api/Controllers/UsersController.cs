using Api.Entities;
using Api.Models.Users;
using Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize(Roles = "Admin, Accountant")]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        IPralnicaRepository _repository;
        public UsersController(IPralnicaRepository repository)
        {
            _repository = repository;
        }


        [HttpDelete("{id}")]
        public IActionResult deleteUser(string id)
        {
            var user = _repository.GetUser(id);
            if (user == null)
            {
                return BadRequest();
            }
            user.IsAllowed = user.Deleted = true;

            _repository.UpdateUser(user);

            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok();
        }




        [Authorize(Roles = "Admin, Accountant")]
        [HttpGet]
        public IActionResult GetUsers()
        {

            var users = _repository.GetUsers();
            var a = Mapper.Map<IEnumerable<GetUsersDto>>(users);
            return Ok(a);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateUserAllowed(string id)
        {
            var user = _repository.GetUser(id);
            if(user == null)
            {
                return BadRequest();
            }
            user.IsAllowed = user.IsAllowed ? false : true;

            _repository.UpdateUser(user);

            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok();
        }




    }
}
