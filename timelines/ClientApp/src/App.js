import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Schedules } from './components/Schedules';
import { ClickupTable } from './components/ClickupTable';
import { CombinedTable } from './components/CombinedTable';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/schedules' component={Schedules} />
            <Route path='/clickup-table' component={ClickupTable} />
            <Route path='/combined-table' component={CombinedTable} />
      </Layout>
    );
  }
}
