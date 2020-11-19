import React, { Component } from 'react';

export class ClickupTable extends Component {
    displayName = ClickupTable.name

    constructor(props) {
        super(props);
        this.state = { clickUp: [], loading: true };

        fetch('api/Tasks')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUp: data.tasks, loading: false });
            });
    }

    static renderSchedulesTable(clickUp) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Appraisal</th>
                        <th>ACID</th>
                        <th>ProcessType</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUp.map(task =>
                        <tr key={task.id}>
                            <td>{task.name}</td>
                            <td>{task.id}</td>
                            <td>{task.creator.username}</td>
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
            : ClickupTable.renderSchedulesTable(this.state.clickUp);

        return (
            <div>
                <h1>Clickup tasks</h1>
                <p>This component demonstrates fetching data from clickup.</p>
                {contents}
            </div>
        );
    }
}
