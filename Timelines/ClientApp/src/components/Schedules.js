import React, { Component } from 'react';

export class Schedules extends Component {
    displayName = Schedules.name

    constructor(props) {
        super(props);
        this.state = { schedules: [], loading: true };

        fetch('api/Schedule')
            .then(response => response.json())
            .then(data => {
                this.setState({ schedules: data, loading: false });
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
                    {schedules.slice(0,10).map(schedule =>
                        <tr key={schedule.scheduleId}>
                            <td>{schedule.appraisal}</td>
                            <td>{schedule.acid}</td>
                            <td>{schedule.processType}</td>
                            <td>{schedule.status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Schedules.renderSchedulesTable(this.state.schedules);
        console.log(this.state.schedules[0]);

        return (
            <div>
                <h1>Schedules</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
