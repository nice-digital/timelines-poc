import React, { Component } from 'react';

export class Schedules extends Component {
    displayName = Schedules.name

    constructor(props) {
        super(props);
        this.state = { schedules: [], loading: true };

        fetch('api/Schedule/getSchedules')
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
                    {schedules.map(schedule =>
                        <tr key={forecast.ScheduleId}>
                            <td>{forecast.Appraisal}</td>
                            <td>{forecast.ACID}</td>
                            <td>{forecast.ProcessType}</td>
                            <td>{forecast.Status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderSchedulesTable(this.state.schedules);

        return (
            <div>
                <h1>Schedules</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
