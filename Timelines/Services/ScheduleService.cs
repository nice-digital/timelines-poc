using System.Collections.Generic;
using Timelines.Models;

namespace Timelines.Services
{
    public interface IScheduleService
    {
        List<Schedule> GetPlanningToolSchedules();
    }
    public class ScheduleService : IScheduleService
    {
        private readonly TimelinesContext _context;

        public ScheduleService(TimelinesContext timelinesContext)
        {
            _context = timelinesContext;
        }

        public List<Schedule> GetPlanningToolSchedules()
        {
            return _context.GetPlanningToolSchedules();
        }
    }
}
