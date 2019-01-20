using Api.Entities;
using Api.Models.WashingRoom;
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
    [Authorize(Roles ="Admin")]
    [Route("api/[controller]")]
    public class WashingRoomController : Controller
    {
        private IPralnicaRepository _repository;

        public WashingRoomController(IPralnicaRepository repository)
        {
            _repository = repository;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetWashingRooms()
        {
            ;
            var rooms = _repository.GetRooms();
            var roomDto = Mapper.Map<IEnumerable<GetWashingRoomDto>>(rooms);
            return Ok(rooms);
        }
        [HttpPost]
        public IActionResult AddWashingRoom([FromBody] AddWashingRoomDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var washingRoom = Mapper.Map<WashingRoom>(model);
            _repository.AddWashingRoom(washingRoom);
            if (!_repository.Save())
            {
                return BadRequest();
            } 
            return Ok(washingRoom);
        }


        [HttpPut]
        public IActionResult UpdateWashingRoom([FromBody] GetWashingRoomDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var washingRoom = Mapper.Map<WashingRoom>(model);
            _repository.updateWashingRoom(washingRoom);
            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok(washingRoom);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateRoomStatus(int id)
        {
            var washingRoom = _repository.getWashingRoom(id);
            if(washingRoom == null)
            {
                return BadRequest();
            }
            washingRoom.IsActive =  washingRoom.IsActive ? false : true;

            _repository.updateWashingRoom(washingRoom);

            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok();
        }
        [HttpDelete("{id}")]
        public IActionResult deleteRoomStatus(int id)
        {
            var washingRoom = _repository.getWashingRoom(id);
            if (washingRoom == null)
            {
                return BadRequest();
            }
            washingRoom.IsDeleted = washingRoom.IsDeleted ? false : true;

            _repository.deleteWashingRoom(washingRoom);

            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok();
        }

    }
}
