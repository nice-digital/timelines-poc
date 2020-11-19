using Chinchilla.ClickUp.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Timelines.Services;

namespace Timelines.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly ITasksService _tasksService;

        public TasksController(ITasksService tasksService)
        {
            _tasksService = tasksService;
        }

        /// <summary>
        /// GET: eg. api/Tasks/GetTasks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public Task<ResponseTasks> GetTasks()
        {
            var response = _tasksService.GetTasksAsync();
            return response;
        }
    }
}


