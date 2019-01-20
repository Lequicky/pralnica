using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class final1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "WashingRoom",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Period",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_PeriodId",
                table: "Reservation",
                column: "PeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_ReservationStatusId",
                table: "Reservation",
                column: "ReservationStatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Reservation_WashingRoomId",
                table: "Reservation",
                column: "WashingRoomId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_Period_PeriodId",
                table: "Reservation",
                column: "PeriodId",
                principalTable: "Period",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation",
                column: "ReservationStatusId",
                principalTable: "ReservationStatus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reservation_WashingRoom_WashingRoomId",
                table: "Reservation",
                column: "WashingRoomId",
                principalTable: "WashingRoom",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_Period_PeriodId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_ReservationStatus_ReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Reservation_WashingRoom_WashingRoomId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_PeriodId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_ReservationStatusId",
                table: "Reservation");

            migrationBuilder.DropIndex(
                name: "IX_Reservation_WashingRoomId",
                table: "Reservation");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "WashingRoom");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Period");
        }
    }
}
