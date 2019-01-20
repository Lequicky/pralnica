using Api.Entities;
using Api.Models.Message;
using Api.Models.Reservation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public class PralnicaRepository : IPralnicaRepository
    {
        private ApplicationDbContext _context;
        private IConfiguration _config;
        public PralnicaRepository(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public void CreateAppUser(AppUser appUser)
        {
            _context.Users.Add(appUser);
        }

        public IEnumerable<IdentityRole> GetRoles()
        {
            return _context.Roles.ToList();
        }

        public AppUser GetUser(string id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }
        public void UpdateUser(AppUser user)
        {
            _context.Users.Update(user);
        }

        public IEnumerable<AppUser> GetUsers()
        {
            var k = _context.UserRoles.Where(a => a.RoleId == "2").Select(u => u.UserId).ToList();
            return _context.Users
                    .OrderBy(a => a.IsAllowed)
                    .ThenBy(a => a.LastName)
                    .ThenBy(a => a.FirstName)
                    .Where(a=> !a.Deleted && k.Contains(a.Id))
                    .ToList();
        }

        public bool Save()
        {
            return (_context.SaveChanges() >= 0);
        }

        public List<ReservationDto> GetReservations()
        {

            List<ReservationDto> newList = new List<ReservationDto>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[reservations_available_termins_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    ReservationDto r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new ReservationDto();
                        while (oReader.Read())
                        {
                            r.datum = DateTime.Parse(oReader["datum"].ToString());
                            r.period_start = DateTime.Parse(oReader["period_start"].ToString());
                            r.period_end = DateTime.Parse(oReader["period_end"].ToString());
                            r.period_id = Int32.Parse(oReader["period_id"].ToString());
                            r.reserved = Boolean.Parse(oReader["reserved"].ToString());
                            r.period_code = oReader["period_code"].ToString();
                            r.period_name = oReader["period_name"].ToString();
                            r.user_last_first_name = oReader["user_last_first_name"].ToString();
                            r.user_id = oReader["user_id"].ToString();
                            r.datum_string = r.datum.ToString("dd.MMMMM (dddd)");
                            newList.Add(r);
                            r = new ReservationDto();

                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception) { /*Handle error*/ }
            return newList;
        }

        public List<AvailableWashingRoomDto> GetAvailableWashingRoom(int period_id, DateTime date)
        {
            List<AvailableWashingRoomDto> newList = new List<AvailableWashingRoomDto>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[user_washing_room_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    command.Parameters.AddWithValue("@period_id", period_id);
                    command.Parameters.AddWithValue("@date", date);
                    AvailableWashingRoomDto r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new AvailableWashingRoomDto();
                        while (oReader.Read())
                        {
                            r.Id = (int)oReader["Id"];
                            r.Name = oReader["Name"].ToString();
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            newList.Add(r);
                            r = new AvailableWashingRoomDto();

                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }

        public int DoReservation(AppUser user, AddReservationDto res)
        {
            int k = 0;
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[user_reservation_ins]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    command.Parameters.AddWithValue("@period_id", res.PeriodId);
                    command.Parameters.AddWithValue("@date", res.Date);
                    command.Parameters.AddWithValue("@user_id", res.UserId);
                    command.Parameters.AddWithValue("@washing_machine_count", res.WashingMachineCount);
                    command.Parameters.AddWithValue("@washing_room_id", res.RoomId);
                    k = command.ExecuteNonQuery();
                    connection.Close();

                }
            }

            catch (Exception ex) { /*Handle error*/ }
            if (k == -1)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        public List<UserLastReservationsDto> GetUserLastReservations(string user_id)
        {
            List<UserLastReservationsDto> newList = new List<UserLastReservationsDto>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[user_show_reservations_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    command.Parameters.AddWithValue("@user_id", user_id);
                    UserLastReservationsDto r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new UserLastReservationsDto();
                        while (oReader.Read())
                        {
                            r.Id = (int)oReader["Id"];
                            r.DateOfWashing = DateTime.Parse(oReader["DateOfWashing"].ToString()).ToString("dd.MMMMM (dddd)");
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            r.PeriodName = oReader["period_name"].ToString();
                            r.WashingRoomName = oReader["washing_room_name"].ToString();
                            r.Status = Boolean.Parse(oReader["status"].ToString());
                            newList.Add(r);
                            r = new UserLastReservationsDto();

                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }



        public List<UserLastReservationsDto> GetUserOldReservations(string user_id)
        {
            List<UserLastReservationsDto> newList = new List<UserLastReservationsDto>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[user_show_old_reservations_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    command.Parameters.AddWithValue("@user_id", user_id);
                    UserLastReservationsDto r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new UserLastReservationsDto();
                        while (oReader.Read())
                        {
                            r.Id = (int)oReader["Id"];
                            r.DateOfWashing = DateTime.Parse(oReader["DateOfWashing"].ToString()).ToString("dd.MMMMM (dddd)");
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            r.PeriodName = oReader["period_name"].ToString();
                            r.WashingRoomName = oReader["washing_room_name"].ToString();
                            r.Status = Boolean.Parse(oReader["status"].ToString());
                            newList.Add(r);
                            r = new UserLastReservationsDto();

                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }
        public void DeleteReservation(int id)
        {
            Reservation r = _context.Reservations.FirstOrDefault(x => x.Id == id);
            _context.Reservations.Remove(r);
        }

        public List<UserMonthReservations> GetUserMonthReservations(string user_id, DateTime date)
        {
            List<UserMonthReservations> newList = new List<UserMonthReservations>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[get_user_month_report_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    command.Parameters.AddWithValue("@user_id", user_id);
                    command.Parameters.AddWithValue("@date", date);
                    UserMonthReservations r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new UserMonthReservations();
                        while (oReader.Read())
                        {
                            r.Id = Int32.Parse(oReader["id"].ToString());
                            r.DateOfWashing = DateTime.Parse(oReader["DateOfWashing"].ToString()).ToString("dd.MMMMM (dddd)");
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            r.PeriodName = oReader["period_name"].ToString();
                            r.WashingRoomName = oReader["washing_room_name"].ToString();
                            r.LastName = oReader["LastName"].ToString();
                            r.FirstName = oReader["FirstName"].ToString();
                            newList.Add(r);
                            r = new UserMonthReservations();

                        }

                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }


        public List<MonthReport> GetUserMonthReservations(DateTime date)
        {
            List<MonthReport> newList = new List<MonthReport>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[get_month_report_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@date", date);
                    command.CommandTimeout = 5;
                    MonthReport r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new MonthReport();
                        while (oReader.Read())
                        {
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            r.RoomNumber = oReader["RoomNumber"].ToString();
                            r.LastName = oReader["LastName"].ToString();
                            r.FirstName = oReader["FirstName"].ToString();
                            r.Tip = oReader["tip"].ToString();
                            newList.Add(r);
                            r = new MonthReport();
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }
        public List<ReceptorDataDto> GetReceptorData()
        {
            List<ReceptorDataDto> newList = new List<ReceptorDataDto>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[get_receptor_reservation_data_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    ReceptorDataDto r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new ReceptorDataDto();
                        while (oReader.Read())
                        {
                            r.ReservationId = oReader["reservation_id"].ToString();
                            r.WashingMachineCount = (int)oReader["WashingMachineCount"];
                            r.LastName = oReader["LastName"].ToString();
                            r.FirstName = oReader["FirstName"].ToString();
                            r.WashingRoomName = oReader["washing_room_name"].ToString();
                            r.PeriodName = oReader["period_name"].ToString();
                            r.StartStatus = Boolean.Parse(oReader["start_status"].ToString());
                            r.EndStatus = Boolean.Parse(oReader["end_status"].ToString());
                            r.ImageUrl = oReader["img_url"].ToString();
                            newList.Add(r);
                            r = new ReceptorDataDto();
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }

        public void StartWashing(int id)
        {
            Reservation r = _context.Reservations.FirstOrDefault(x => x.Id == id);
            r.RecordTimestampStart = DateTime.Now;
            r.ReservationStatusId = 2;
        }

        public void StopWashing(int id)
        {
            Reservation r = _context.Reservations.FirstOrDefault(x => x.Id == id);
            r.RecordTimestampFinish = DateTime.Now;
            r.ReservationStatusId = 3;
        }

        public void AddMessage(Message mes)
        {
            mes.RecordTimeStamp = DateTime.Now;
            _context.Message.Add(mes);
        }

        public List<GetMessage> GetAllMessages()        
        {
            List<GetMessage> newList = new List<GetMessage>();
            try
            {
                using (SqlConnection connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    connection.Open();
                    SqlCommand command = new SqlCommand("[dbo].[show_messages_sel]", connection);
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandTimeout = 5;
                    GetMessage r;
                    using (SqlDataReader oReader = command.ExecuteReader())
                    {
                        r = new GetMessage();
                        while (oReader.Read())
                        {
                            r.MessageText =oReader["MessageText"].ToString();
                            r.UserLastFirstName = oReader["userLastFirstName"].ToString();
                            newList.Add(r);
                            r = new GetMessage();
                        }
                        connection.Close();
                    }
                }
            }
            catch (Exception ex) { /*Handle error*/ }
            return newList;
        }


        public void AddWashingRoom(WashingRoom room)
        {
            _context.WashingRooms.Add(room);
        }



        public WashingRoom getWashingRoom(int id)
        {
            return _context.WashingRooms.FirstOrDefault(a => a.Id == id);
        }

        public void updateWashingRoom(WashingRoom room)
        {
            _context.WashingRooms.Update(room);
        }

        IEnumerable<WashingRoom> IPralnicaRepository.GetRooms()
        {
            return _context.WashingRooms.ToList().Where(a => !a.IsDeleted);
        }

        public void deleteWashingRoom(WashingRoom room)
        {
            _context.WashingRooms.Update(room);
        }
    }
}
