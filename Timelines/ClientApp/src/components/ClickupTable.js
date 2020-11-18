import React, { Component } from 'react';
const axios = require('axios');

export class ClickupTable extends Component {
    displayName = ClickupTable.name

    constructor(props) {
        super(props);
        this.state = { schedules: [], loading: true };
    }

    componentDidMount(){
        axios({
            method: 'get',
            //In the real thing we're going to need to get the lists in the folder we are interested in, then do this for each list I think?
            url: process.env.REACT_APP_CLICKUP_API,
            headers: {
                "content-type": "application/json",
                "authorization": `\'${process.env.REACT_APP_CLICKUP_API_TOKEN}\'`,
            }
        })
            .then(response => {
                this.setState({ schedules: response.data, loading: false });
            })
            .catch(error => {
                console.log(error);
            });
    }

    static renderSchedulesTable(schedules) {
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
                    {schedules.map(schedule =>
                        <tr key={schedule.id}>
                            <td>{schedule.name}</td>
                            <td>{schedule.id}</td>
                            <td>{schedule.creator.username}</td>
                            <td>{schedule.status.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ClickupTable.renderSchedulesTable(this.state.schedules);

        return (
            <div>
                <h1>Clickup tasks</h1>
                <p>This component demonstrates fetching data from clickup.</p>
                {contents}
            </div>
        );
    }
}
