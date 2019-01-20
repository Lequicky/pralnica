using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class washingMachineCountFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WashhingMachineCount",
                table: "Reservation");

            migrationBuilder.AddColumn<int>(
                name: "WashingMachineCount",
                table: "Reservation",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WashingMachineCount",
                table: "Reservation");

            migrationBuilder.AddColumn<int>(
                name: "WashhingMachineCount",
                table: "Reservation",
                nullable: false,
                defaultValue: 0);
        }
    }
}
