using Microsoft.Extensions.Configuration;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Chinchilla.ClickUp.Responses;
using Newtonsoft.Json;
using System.Collections.Generic;
using Chinchilla.ClickUp.Responses.Model;
using Timelines.Models;

namespace Timelines.Services
{
    public interface IClickUpService
    {
        Task<ResponseTasks> GetTasksAsync(string listId = "33997373");
        Task<ResponseFolderlessLists> GetListsAsync();
        Task<IEnumerable<ResponseTasks>> GetTasksForListsAsync();
    }
    public class ClickUpService : IClickUpService
    {
        private readonly IConfiguration Configuration;

        public ClickUpService(IConfiguration configuration)
        {
            Configuration = configuration;
        }
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

        //public async Task<IEnumerable<ListWithTasks>> GetTasksForListsAsync()
        //{
        //    var allTasks = new List<ListWithTasks>();
        //    var clickUpLists = GetListsAsync();

        //    clickUpLists.Result.Lists.ForEach(async delegate (ResponseModelList list)
        //    {
        //       var listTasks = await GetTasksAsync(list.Id);
        //       var listWithTasks = new ListWithTasks(list.Id, list.Name, listTasks);
        //       allTasks.Add(listWithTasks);

        //    });
        //    return await Task.WhenAll<ListWithTasks>((IEnumerable<Task<ListWithTasks>>)allTasks);
        //}

        public async Task<IEnumerable<ResponseTasks>> GetTasksForListsAsync()
        {
            var allTasks = new List<Task<ResponseTasks>>();
            var clickUpLists = GetListsAsync();

            clickUpLists.Result.Lists.ForEach(delegate (ResponseModelList list)
            {
                var listTasks = GetTasksAsync(list.Id);
                allTasks.Add(listTasks);
            });

            return await Task.WhenAll<ResponseTasks>(allTasks);
        }
    }
}
