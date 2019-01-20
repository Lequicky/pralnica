using Api.Entities;
using Api.Models.Message;
using Api.Models.Reservation;
using Api.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Authorize(Roles = "Admin, Student")]
    [Route("api/[controller]")]
    public class ReservationsController : Controller
    {
        IPralnicaRepository _repository;
        private UserManager<AppUser> _userManager;
        public ReservationsController(IPralnicaRepository repository, UserManager<AppUser> userManager)
        {
            _repository = repository;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetReservations()
        {
            List<ReservationDto> term1 = new List<ReservationDto>();
            List<ReservationDto> term2 = new List<ReservationDto>();
            List<ReservationDto> term3 = new List<ReservationDto>();
            List<ReservationDto> term4 = new List<ReservationDto>();
            List<string> ddays = new List<string>();
            List<string> terminss = new List<string>();
            Dictionary<string, List<ReservationDto>> ddays3 = new Dictionary<string, List<ReservationDto>>();

            var reservations = _repository.GetReservations();
            foreach(ReservationDto res in reservations)
            {
                if(!ddays.Contains(DateTime.Parse(res.datum.ToString()).ToString("dd.MMMMM (dddd)")))
                {
                    ddays.Add(DateTime.Parse(res.datum.ToString()).ToString("dd.MMMMM (dddd)"));
                    
                }

                if (!terminss.Contains(res.period_name))
                {
                    terminss.Add(res.period_name);
                }

                if (!ddays3.ContainsKey(DateTime.Parse(res.datum.ToString()).ToString("dd.MMMMM (dddd)")))
                {
                    ddays3[DateTime.Parse(res.datum.ToString()).ToString("dd.MMMMM (dddd)")] = new List<ReservationDto>();
                }
                ddays3[DateTime.Parse(res.datum.ToString()).ToString("dd.MMMMM (dddd)")].Add(res);

            }

            foreach(ReservationDto res in reservations)
            {
                if(res.period_id == 1)
                {
                    term1.Add(res);
                }
                if (res.period_id == 2)
                {
                    term2.Add(res);
                }
                if (res.period_id == 3)
                {
                    term3.Add(res);
                }
                if (res.period_id == 4)
                {
                    term4.Add(res);
                }
            }


            return Ok(new
            {
                days = ddays,
                termin1 = term1,
                termin2 = term2,
                termin3 = term3,
                termin4 = term4,
                termini = terminss
            });
        }

        [HttpGet("available/{period_id}/{date}")]
        public IActionResult GetAvailableWashingRoom(int period_id, string date) 
        {
            var rooms = _repository.GetAvailableWashingRoom(period_id, DateTime.Parse(date));
            return Ok(rooms);
        }

        [HttpPost]
        public async Task<IActionResult> DoReservationAsync([FromBody] AddReservationDto res )
        {
            res.UserId = res.UserId.Replace('\"', ' ').Trim();
            var user = await _userManager.FindByIdAsync(res.UserId);
            int k=0;
            if(user != null)
            {
               k =  _repository.DoReservation(user, res);
            }
            if (k == 1)
                return Ok(new
                {
                    status = 1
                });
            else
                return Ok(new
                {
                    status = 0
                });
        }

        [HttpDelete("{id}")]
        public IActionResult Test(int id)
        {
            _repository.DeleteReservation(id);
            _repository.Save();
            return Ok();
        }

        
        [HttpGet("{user_id}")]
        public IActionResult GetUserLastReservations(string user_id)
        {
            user_id = user_id.Replace('\"', ' ').Trim();
            var reservations = _repository.GetUserLastReservations(user_id);

            return Ok(reservations);
        }

        [HttpGet("h/{user_id}")]
        public IActionResult GetUserOldReservations(string user_id)
        {
            user_id = user_id.Replace('\"', ' ').Trim();
            var reservations = _repository.GetUserOldReservations(user_id);

            return Ok(reservations);
        }
        [AllowAnonymous]
        [HttpGet("{user_id}/{date}")]
        public IActionResult GetUserMonthReservations(string user_id, DateTime date)
        {
            user_id = user_id.Replace('\"', ' ').Trim();
            var reservations = _repository.GetUserMonthReservations(user_id, date);

            return Ok(reservations);
        }
        [AllowAnonymous]
        [HttpGet("report/{date}")]
        public IActionResult GetReportData(DateTime date)
        {
            var reservations = _repository.GetUserMonthReservations(date);
            return Ok(reservations);
        }

        [AllowAnonymous]
        [HttpGet("receptor")]
        public IActionResult GetDataForReceptor()
        {
            var reservations = _repository.GetReceptorData();
            return Ok(reservations);
        }

        [AllowAnonymous]
        [HttpPost("receptor/start/{id}")]
        public IActionResult resStart(int id)
        {
            _repository.StartWashing(id);
            _repository.Save();
            return Ok();
        }

        
        [AllowAnonymous]
        [HttpPost("receptor/end/{id}")]
        public IActionResult resEnd(int id)
        {
            _repository.StopWashing(id);
            _repository.Save();
            return Ok();
        }
        [AllowAnonymous]
        [HttpPost("message")]
        public IActionResult AddMessage([FromBody] AddMessage res)
        {
            res.IdentityId = res.IdentityId.Replace('\"', ' ').Trim();
            var message = Mapper.Map<Message>(res);
            _repository.AddMessage(message);
            if (!_repository.Save())
            {
                return BadRequest();
            }
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("message")]
        public IActionResult GetMessage()
        {
            var mes = _repository.GetAllMessages();
            return Ok(mes);
        }

        [AllowAnonymous]
        [HttpPost("{user_id}/image")]
        public async Task<IActionResult>  AddImage(string user_id, List<IFormFile> files)
        {
            try
            {
                var user = _repository.GetUser(user_id);
                if (user != null)
                {
                    
                    var file = Request.Form.Files[0];
                    string folderName = "img";
                    string webRootPath = @"C:\Users\Andrej\Desktop\DIPLOMSKA NALOGA\DO 8 julija\Angular5\src\assets\";
                    string newPath = Path.Combine(webRootPath, folderName);
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                    }
                    if (file.Length > 0)
                    {
                        string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        if (System.IO.File.Exists(Path.Combine(newPath, fileName))){
                            System.IO.File.Delete(Path.Combine(newPath, fileName));
                        }
                        user.ImageUrl = fileName;
                        _repository.Save();
                        string fullPath = Path.Combine(newPath, fileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                    }
                    return Ok();
                }
                return BadRequest("Upload Failed: ");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Upload Failed: " + ex.Message);
            }
        }
    }
}
