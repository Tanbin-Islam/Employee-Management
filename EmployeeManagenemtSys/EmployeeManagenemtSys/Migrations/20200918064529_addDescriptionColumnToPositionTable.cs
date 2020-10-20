using Microsoft.EntityFrameworkCore.Migrations;

namespace EmployeeManagenemtSys.Migrations
{
    public partial class addDescriptionColumnToPositionTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "positions",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "positions");
        }
    }
}
