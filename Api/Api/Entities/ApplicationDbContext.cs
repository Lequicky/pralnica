using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Period> Periods { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<WashingRoom> WashingRooms { get; set; }
        public DbSet<ReservationStatus> ReservationStatuses { get; set; }
        public DbSet<Message> Message { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Period>().ToTable("Period");
            builder.Entity<Reservation>().ToTable("Reservation");
            builder.Entity<WashingRoom>().ToTable("WashingRoom");
            builder.Entity<ReservationStatus>().ToTable("ReservationStatus");
            builder.Entity<Message>().ToTable("Message");
        }
    }
}
