using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Timelines.Models;
using Timelines.Services;

namespace Timelines.Controllers
{
    [Route("api/[controller]")]
    public class ScheduleController : Controller
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService;
        }

        /// <summary>
        /// GET: eg. api/ScheduleController
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Schedule> Get()
        {
            var result = _scheduleService.GetSchedules();
            return result;
        }
    }
}


