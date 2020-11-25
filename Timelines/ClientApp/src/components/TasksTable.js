import React, { Component } from 'react';
import moment from 'moment';

export class TasksTable extends Component {
    displayName = TasksTable.name

    constructor(props) {
        super(props);
        this.state = { clickUp: [], loading: true };

        fetch('api/ClickUpTasks')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUp: data.tasks, loading: false });
            });
    }

    static renderTasksTable(clickUp) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Task name</th>
                        <th>Task id</th>
                        <th>Due date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUp.map(task =>
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.id}</td>
                            <td>{task.due_date ? moment(task.due_date).format("Do MMM YYYY") : "-"}</td>
                            <td>{task.status.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TasksTable.renderTasksTable(this.state.clickUp);

        return (
            <div>
                <h1>Clickup tasks</h1>
                <p>This component demonstrates fetching task level data from clickup.</p>
                {contents}
            </div>
        );
    }
}
