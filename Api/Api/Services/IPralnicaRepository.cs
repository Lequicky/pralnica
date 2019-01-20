using Api.Entities;
using Api.Models.Message;
using Api.Models.Reservation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Services
{
    public interface IPralnicaRepository
    {
        IEnumerable<AppUser> GetUsers();
        void CreateAppUser(AppUser appUser);
        bool Save();

        IEnumerable<IdentityRole> GetRoles();

        AppUser GetUser(string id);
        void UpdateUser(AppUser user);

        List<ReservationDto> GetReservations();

        List<AvailableWashingRoomDto> GetAvailableWashingRoom(int period_id, DateTime date);

        int DoReservation(AppUser user, AddReservationDto res);
        List<UserLastReservationsDto> GetUserLastReservations(string user_id);
        List<UserMonthReservations> GetUserMonthReservations(string user_id, DateTime date);

        void DeleteReservation(int id);
        List<MonthReport> GetUserMonthReservations(DateTime date);
        List<ReceptorDataDto> GetReceptorData();

        void StartWashing(int id);
        void StopWashing(int id);

        void AddMessage(Message mes);
        List<GetMessage> GetAllMessages();
        List<UserLastReservationsDto> GetUserOldReservations(string user_id);

        IEnumerable<WashingRoom> GetRooms();

        void AddWashingRoom(WashingRoom room);
        WashingRoom getWashingRoom(int id);

        void updateWashingRoom(WashingRoom room);
        void deleteWashingRoom(WashingRoom room);
    }
}
