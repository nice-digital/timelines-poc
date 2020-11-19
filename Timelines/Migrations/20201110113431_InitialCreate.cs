using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Timelines.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Appraisal = table.Column<string>(nullable: true),
                    ACID = table.Column<int>(nullable: false),
                    ProcessType = table.Column<string>(nullable: true),
                    Status = table.Column<string>(nullable: true),
                    CommitteeLetter = table.Column<string>(nullable: true),
                    CommitteeStream = table.Column<string>(nullable: true),
                    ERG = table.Column<string>(nullable: true),
                    AnticipatedLicenceDates = table.Column<string>(nullable: true),
                    ActualLicenceDates = table.Column<DateTime>(nullable: false),
                    DateOfDraftScopeConsultation = table.Column<DateTime>(nullable: false),
                    InvitationToParticipate = table.Column<DateTime>(nullable: false),
                    SendSubmissionToERG = table.Column<DateTime>(nullable: false),
                    DeadlineForERGReceipt = table.Column<DateTime>(nullable: false),
                    FirstMeeting = table.Column<DateTime>(nullable: false),
                    ACDandEvalReportOnWeb = table.Column<DateTime>(nullable: false),
                    FADPublished = table.Column<DateTime>(nullable: false),
                    CommitteeMeeting = table.Column<DateTime>(nullable: false),
                    PublicationDate = table.Column<DateTime>(nullable: false),
                    LatestMasterNote = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.ScheduleId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schedules");
        }
    }
}
