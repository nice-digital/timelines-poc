import React, { Component } from 'react';

export class ListsTable extends Component {
    displayName = ListsTable.name

    constructor(props) {
        super(props);
        this.state = { clickUpLists: [], loading: true };
    }

    componentDidMount() {
        //In the real thing we will need to get the list that matches the schedule, then find the relevant tasks for the columns 
        fetch('api/ClickUpLists')
            .then(response => response.json())
            .then(data => {
                this.setState({ clickUpLists: data.lists, loading: false });
            });

    }

    static renderListsTable(clickUpLists) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>List Name</th>
                        <th>List id</th>
                        <th>Folder name</th>
                        <th>Space name</th>
                    </tr>
                </thead>
                <tbody>
                    {clickUpLists.map(list =>
                        <tr key={list.id}>
                            <td>{list.name}</td>
                            <td>{list.id}</td>
                            <td>{list.folder.name}</td>
                            <td>{list.space.name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = !this.state.loading
            ? ListsTable.renderListsTable(this.state.clickUpLists)
            : <p><em>Loading...</em></p>;

        return (
            <div>
                <h1>Clickup lists</h1>
                <p>This component demonstrates data held at the list level from clickup</p>
                {contents}
            </div>
        );
    }
}
