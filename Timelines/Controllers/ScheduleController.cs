using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Timelines.Models;
using Timelines.Services;

namespace Timelines.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ScheduleController : Controller
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        /// <summary>
        /// GET: eg. api/Schedule/GetSchedules
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Schedule> GetSchedules()
        {
            return _scheduleService.GetPlanningToolSchedules();
        }
    }
}


