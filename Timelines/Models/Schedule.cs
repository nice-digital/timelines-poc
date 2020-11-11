using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Timelines.Models
{
    public partial class Schedule
    {
        public int ScheduleId { get; set; }
        public string Appraisal { get; set; }
        public int ACID { get; set; }
        public string ProcessType { get; set; }
        public string Status { get; set; }
        public string CommitteeLetter { get; set; }
        public string CommitteeStream { get; set; }
        public string ERG { get; set; }
        public string AnticipatedLicenceDates { get; set; }
        public string ActualLicenceDates { get; set; }
        public string DateOfDraftScopeConsultation { get; set; }
        public string InvitationToParticipate { get; set; }
        public string SendSubmissionToERG { get; set; }
        public string DeadlineForERGReceipt { get; set; }
        public string FirstMeeting { get; set; }
        public string ACDandEvalReportOnWeb { get; set; }
        public string FADPublished { get; set; }
        public string CommitteeMeeting { get; set; }
        public string PublicationDate { get; set; }
        public string LatestMasterNote { get; set; }

    }
}
