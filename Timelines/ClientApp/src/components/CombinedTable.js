import React, { Component } from 'react';
import moment from 'moment';

export class CombinedTable extends Component {
    displayName = CombinedTable.name

    constructor(props) {
        super(props);
        this.state = { clickUpLists: [], planningTools: [], loading: true, loading2: true };
    }

    componentDidMount() {
        fetch('api/ClickUpTasksWithLists')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUpLists: data, loading: false });
            });

        fetch('api/Schedule')
            .then(response => response.json())
            .then(data => {
                this.setState({ planningTools: data, loading2: false });
            });
    }

    static renderSchedulesTable(clickUpLists, planningTools) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>List Name</th>
                        <th style={{ color: "green" }}>Appraisal</th>
                        <th>ACID (List id from clickup)</th>
                        <th style={{ color: "green" }}>Process Type</th>
                        <th style={{ color: "green" }}>Committee</th>
                        <th style={{ color: "red" }}>Consultation date</th>
                        <th style={{ color: "red" }}>Guidance publication date</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUpLists.map(list =>
                        <tr key={list.listID}>
                            <td>{list.listName}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.listID) ? planningTools.find(schedule => schedule.acid === list.listID).appraisal : "-"}</td>
                            <td>{list.listID}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.listID) ? planningTools.find(schedule => schedule.acid === list.listID).processType : "-"}</td>
                            <td>{planningTools.find(schedule => schedule.acid === list.listID) ? planningTools.find(schedule => schedule.acid === list.listID).committeeLetter : "-"}</td>
                            <td>{moment(list.tasks.tasks.find(task => task.name === "Consultation").due_date).format("Do MMM YYYY")}</td>
                            <td>{moment(list.tasks.tasks.find(task => task.name === "Publish guidance").due_date).format("Do MMM YYYY")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = !this.state.loading && !this.state.loading2
            ? CombinedTable.renderSchedulesTable(this.state.clickUpLists, this.state.planningTools)
            : <p><em>Loading...</em></p>;

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
