using Chinchilla.ClickUp.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Timelines.Models;
using Timelines.Services;

namespace Timelines.Controllers
{
    [Produces("application/json")]
    public class ClickUpController : Controller
    {
        private readonly IClickUpService _clickUpService;

        public ClickUpController(IClickUpService clickUpService)
        {
            _clickUpService = clickUpService;
        }

        /// <summary>
        /// GET: eg. api/ClickUpTasks
        /// </summary>
        /// <returns></returns>
        [Route("api/[controller]Tasks")]
        [HttpGet]
        public Task<ResponseTasks> GetTasks()
        {
            var response = _clickUpService.GetTasksAsync();
            return response;
        }

        /// <summary>
        /// GET: eg. api/ClickUpLists
        /// </summary>
        /// <returns></returns>
        [Route("api/[controller]Lists")]
        [HttpGet]
        public Task<ResponseFolderlessLists> GetLists()
        {
            var response = _clickUpService.GetListsAsync();
            return response;
        }

        /// <summary>
        /// GET: eg. api/ClickUpTasksWithLists
        /// </summary>
        /// <returns></returns>
        [Route("api/[controller]TasksWithLists")]
        [HttpGet]
        public Task<IEnumerable<ListWithTasks>> GetTasksWithListsAsync()
        {
            var response = _clickUpService.GetTasksWithListsAsync();
            return response;
        }
    }
}


