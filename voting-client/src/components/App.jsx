import React from 'react';
import { Map, List } from 'immutable';
import { Switch, Route } from 'react-router-dom';

import Voting  from './Voting';
import Results from './Results';

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Voting} />
                <Route exact path="/results" component={Results} />
            </Switch>
        )
    }
}