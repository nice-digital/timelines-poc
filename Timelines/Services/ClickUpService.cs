using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Chinchilla.ClickUp.Responses;
using Newtonsoft.Json;
using System.Collections.Generic;
using Timelines.APIModels;

namespace Timelines.Services
{
    public interface IClickUpService
    {
        Task<ResponseTasks> GetTasksAsync(string listId = "33997373");
        Task<ResponseFolderlessLists> GetListsAsync();
        Task<IEnumerable<ListWithTasks>> GetTasksWithListsAsync();
        Task<CIPResponseTasks> GetCIPTasksAsync();
    }
    public class ClickUpService : IClickUpService
    {
        private readonly IConfiguration Configuration;

        public ClickUpService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // The default value for listId is an appraisals list to provide an example list with tasks that we know exists for demo purposes
        public async Task<ResponseTasks> GetTasksAsync(string listId = "33997373")
        {
            var baseAddress = new Uri("https://api.clickup.com/api/v2/");

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", Configuration["clickupAccessToken"]);
                var route = $"list/{listId}/task";

                using (var response = await httpClient.GetAsync(route))
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var deserializedData = JsonConvert.DeserializeObject<ResponseTasks>(responseData);
                    return deserializedData;
                }
            }
        }

        public async Task<ResponseFolderlessLists> GetListsAsync()
        {
            var baseAddress = new Uri("https://api.clickup.com/api/v2/");

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", Configuration["clickupAccessToken"]);

                //This folder is the one for appraisals in the CHTE workspace
                using (var response = await httpClient.GetAsync("folder/15148580/list"))
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var deserializedData = JsonConvert.DeserializeObject<ResponseFolderlessLists>(responseData);
                    return deserializedData;
                }
            }
        }

        public async Task<IEnumerable<ListWithTasks>> GetTasksWithListsAsync()
        {
            var allTasks = new List<ListWithTasks>();
            var clickUpLists = await GetListsAsync();
            foreach (var list in clickUpLists.Lists)
            {
                var listTasks = await GetTasksAsync(list.Id);
                var listWithTasks = new ListWithTasks(list.Id, list.Name, listTasks);
                allTasks.Add(listWithTasks);
            }
            return allTasks;
        }

        public async Task<CIPResponseTasks> GetCIPTasksAsync()
        {
            var baseAddress = new Uri("https://api.clickup.com/api/v2/");

            using (var httpClient = new HttpClient { BaseAddress = baseAddress })
            {
                httpClient.DefaultRequestHeaders.TryAddWithoutValidation("authorization", Configuration["clickupAccessToken"]);
                // We are filtering the tasks using a custom field that indeicates that a task is intended to be seen on the CIP
                var route = "team/2632547/task?page=0&order_by=due_date&reverse=true&include_closed=true&custom_fields=[{\"field_id\":\"5bb24b9e-a86d-4ad5-b301-9ce08f431b1e\",\"operator\":\"=\",\"value\":true}]";

                using (var response = await httpClient.GetAsync(route))
                {
                    string responseData = await response.Content.ReadAsStringAsync();
                    var deserializedData = JsonConvert.DeserializeObject<CIPResponseTasks>(responseData);
                    return deserializedData;
                }
            }
        }
    }
}
