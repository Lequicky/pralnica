using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Api.Migrations
{
    public partial class PopravljenpoljeRoomNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RooomNumber",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "RoomNumber",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoomNumber",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<string>(
                name: "RooomNumber",
                table: "AspNetUsers",
                nullable: true);
        }
    }
}
