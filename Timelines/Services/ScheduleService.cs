using System.Collections.Generic;
using Timelines.Models;

namespace Timelines.Services
{
    public interface IScheduleService
    {
        List<Schedule> GetSchedules();
    }
    public class ScheduleService : IScheduleService
    {
        private readonly TimelinesContext _context;

        public ScheduleService(TimelinesContext timelinesContext)
        {
            _context = timelinesContext;
        }

        public List<Schedule> GetSchedules()
        {
            return _context.GetSchedules();
        }
    }
}
