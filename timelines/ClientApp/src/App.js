import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Schedules } from './components/Schedules';
import { TasksTable } from './components/TasksTable';
import { CombinedTable } from './components/CombinedTable';
import { ListsTable } from './components/ListsTable';
import { ListLevelTable } from './components/ListLevelTable';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/schedules' component={Schedules} />
            <Route path='/clickup-tasks' component={TasksTable} />
            <Route path='/clickup-lists' component={ListsTable} />
            <Route path='/basic-combined-table' component={CombinedTable} />
            <Route path='/full-combined-table' component={ListLevelTable} />
      </Layout>
    );
  }
}
