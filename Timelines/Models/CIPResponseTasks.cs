namespace Timelines.Models
{
    public class CIPResponseTasks
    {
        public CIPResponseTasks(CIPTasks[] tasks)
        {
            CIPTasks = tasks;
        }
        public CIPTasks[] CIPTasks { get; set; }
    }
}
