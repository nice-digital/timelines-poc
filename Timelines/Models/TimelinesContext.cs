using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Timelines.Models
{
    public partial class TimelinesContext : DbContext
    {
        public TimelinesContext(DbContextOptions options) : base(options)
        {

        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlite("Data Source=timelines.db");
        //}
        public DbSet<Schedule> Schedules { get; set; }

        public List<Schedule> GetPlanningToolSchedules()
        {
            var schedules = Schedules.ToList();
            return schedules;
        }
    }
}
