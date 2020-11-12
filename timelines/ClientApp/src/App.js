import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Schedules } from './components/Schedules';
import { ClickupTable } from './components/ClickupTable';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/schedules' component={Schedules} />
            <Route path='/clickup-table' component={ClickupTable} />
      </Layout>
    );
  }
}
