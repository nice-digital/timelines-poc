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
        public DateTime ActualLicenceDates { get; set; }
        public DateTime DateOfDraftScopeConsultation { get; set; }
        public DateTime InvitationToParticipate { get; set; }
        public DateTime SendSubmissionToERG { get; set; }
        public DateTime DeadlineForERGReceipt { get; set; }
        public DateTime FirstMeeting { get; set; }
        public DateTime ACDandEvalReportOnWeb { get; set; }
        public DateTime FADPublished { get; set; }
        public DateTime CommitteeMeeting { get; set; }
        public DateTime PublicationDate { get; set; }
        public string LatestMasterNote { get; set; }

    }
}
