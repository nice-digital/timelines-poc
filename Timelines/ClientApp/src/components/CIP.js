import React, { Component } from 'react';
import moment from 'moment';

export class CIP extends Component {
    displayName = CIP.name

    constructor(props) {
        super(props);
        this.state = { clickUp: [], loading: true };

        fetch('api/ClickUpCIPTasks')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUp: data.cipTasks, loading: false });
            });
    }

    static renderCIPTable(clickUp) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Level</th>
                        <th>Type</th>
                        <th>Short Title</th>
                        <th>Event</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUp.map(task =>
                        <tr key={task.id}>
                            <td>{task.due_date ? moment(task.due_date, "x").format("DD/MM/YYYY") : "-"}</td>
                            <td>{task.custom_fields?.find(field => field.name == "Level").type_config.options[task.custom_fields?.find(field => field.name == "Level")?.value]?.name}</td>
                            <td>{task.project.name}</td>
                            <td>{task.list.name}</td>
                            <td>{task.name}</td>
                            <td>{task.custom_fields?.find(field => field.name == "CIP notes")?.value}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CIP.renderCIPTable(this.state.clickUp);

        return (
            <div>
                <h1>CIP</h1>
                <p>Recreation of the CIP with data pulled from ClickUp</p>
                {contents}
            </div>
        );
    }
}
