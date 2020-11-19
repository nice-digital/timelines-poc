using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Chinchilla.ClickUp.Responses;
using Newtonsoft.Json;

namespace Timelines.Services
{
    public interface ITasksService
    {
        Task<ResponseTasks> GetTasksAsync();
    }
    public class TasksService : ITasksService
    {
        private readonly IConfiguration Configuration;

        public TasksService(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public async Task<ResponseTasks> GetTasksAsync()
        {
            var baseAddress = new Uri("https://api.clickup.com/api/v2/");

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", Configuration["clickupAccessToken"]);

                using (var response = await httpClient.GetAsync("list/33997373/task"))
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var deserializedData = JsonConvert.DeserializeObject<ResponseTasks>(responseData);
                    return deserializedData;
                }
            }
        }
    }
}
