import React, { Component } from 'react';

export class ListLevelTable extends Component {
    displayName = ListLevelTable.name

    constructor(props) {
        super(props);
        this.state = { clickUpLists: [], clickUpTasks: [], planningTools: [], loading: true, loading2: true, loading3: true };
    }

    componentDidMount() {
        //In the real thing we will need to get the list that matches the schedule, then find the relevant tasks for the columns 
        fetch('api/ClickUpTasksForLists')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUpTasks: data, loading3: false });
            });

        fetch('api/ClickUpLists')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUpLists: data.lists, loading: false });
            });

        fetch('api/Schedule')
            .then(response => response.json())
            .then(data => {
                this.setState({ planningTools: data, loading2: false });
            });
    }

    static renderSchedulesTable(clickUpLists, planningTools, clickUpTasks) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>List Name</th>
                        <th style={{ color: "green" }}>Appraisal</th>
                        <th>ACID (List id from clickup)</th>
                        <th style={{ color: "green" }}>Process Type</th>
                        <th style={{ color: "green" }}>Committee</th>
                        <th style={{ color: "red" }}>Publish date</th>
                        <th style={{ color: "red" }}>Consultation date</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUpLists.map(list =>
                        <tr key={list.id}>
                            <td>{list.name}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.id) ? planningTools.find(schedule => schedule.acid === list.id).appraisal : "-"}</td>
                            <td>{list.id}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.id) ? planningTools.find(schedule => schedule.acid === list.id).processType : "-"}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.id) ? planningTools.find(schedule => schedule.acid === list.id).committeeLetter : "-"}</td>
                            <td>{/*clickUpTasks.filter(schedule => schedule.tasks.list.id == list.id).find(schedule => schedule.tasks.tags.name == "publication").due_date*/}</td>
                            <td>{/*find the task that is in that list, and that is the consultation date and get its due date*/}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = !this.state.loading && !this.state.loading2 && !this.state.loading3
            ? ListLevelTable.renderSchedulesTable(this.state.clickUpLists, this.state.planningTools, this.state.clickUpTasks)
            : <p><em>Loading...</em></p>;
        console.log(this.state.clickUpTasks);
        //console.log((!this.state.loading && !this.state.loading3) ? this.state.clickUpTasks.filter(schedules => schedules.tasks[0].list.id == this.state.clickUpLists[0].id) : "");
        //console.log((!this.state.loading && !this.state.loading3) ? this.state.clickUpTasks.filter(schedules => schedules.tasks[0].list.id == this.state.clickUpLists[0].id)[0].tasks.find(task => task.tags.name == "consultation") : "");
        
        return (
            <div>
                <h1>Combined lists, tasks and schedules</h1>
                <p>This component demonstrates fetching data from both clickup and the planning tool and combining it, matching a timeline from the planning tools to a list from the appraisals folder in clickup. We then pull the relevant tasks from that lists to get the dates for those tasks.</p>
                <p>Green headings indicate data from the mock planning tools, black is list level data from clickup, red is task level data from clickup</p>
                {contents}
            </div>
        );
    }
}
