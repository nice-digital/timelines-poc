using Chinchilla.ClickUp.Responses;

namespace Timelines.Models
{
    public class ListWithTasks
    {
        public ListWithTasks(string listID, string listName, ResponseTasks tasks)
        {
            ListID = listID;
            ListName = listName;
            Tasks = tasks;
        }
        public string ListID { get; set; }
        public string ListName { get; set; }
        public ResponseTasks Tasks { get; set; }
    }
}
