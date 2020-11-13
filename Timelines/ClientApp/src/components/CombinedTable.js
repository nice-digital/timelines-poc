import React, { Component } from 'react';
const axios = require('axios');

export class CombinedTable extends Component {
    displayName = CombinedTable.name

    constructor(props) {
        super(props);
        this.state = { clickUp: [], planningTools: [], loading: true, loading2: true };
    }

    componentDidMount(){
        axios({
            method: 'get',
            //In the real thing we're going to need to get the lists in the folder we are interested in, then do this for each list I think?
            url: process.env.REACT_APP_CLICKUP_API,
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${process.env.REACT_APP_CLICKUP_API_TOKEN}`
            }
        })
            .then(response => {
                this.setState({ clickUp: response.data, loading: false });
            });


        fetch('api/Schedule')
            .then(response => response.json())
            .then(data => {
                this.setState({ planningTools: data, loading2: false });
            });
    }

    static renderSchedulesTable(clickUp, planningTools) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th style={{ color: "green" }}>Appraisal</th>
                        <th>Task name</th>
                        <th>ACID</th>
                        <th style={{ color: "green" }}>Process Type</th>
                        <th style={{ color: "green" }}>Committee</th>
                        <th>User</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUp.map(task =>
                        <tr key={task.id}>
                            <td>{planningTools.find(schedule => schedule.acid === task.id).appraisal}</td>
                            <td>{task.name}</td>
                            <td>{task.id}</td>
                            <td>{planningTools.find(schedule => schedule.acid === task.id).processType}</td>
                            <td>{planningTools.find(schedule => schedule.acid === task.id).committeeLetter}</td>
                            <td>{task.creator.username}</td>
                            <td>{task.status.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = !this.state.loading && !this.state.loading2
            ? CombinedTable.renderSchedulesTable(this.state.clickUp, this.state.planningTools)
            : <p><em>Loading...</em></p>;
        console.log(this.state.clickUp)
        console.log(this.state.planningTools)

        return (
            <div>
                <h1>Combined tasks and schedules</h1>
                <p>This component demonstrates fetching data from both clickup and the planning tool and combining it.</p>
                <p>Green headings indicate data from the mock planning tools, the other data is from the ClickUp api.</p>
                {contents}
            </div>
        );
    }
}
