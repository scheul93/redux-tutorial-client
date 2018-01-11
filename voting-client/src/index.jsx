import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import reducer from './reducer';
import App from './components/App';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>{
        store.dispatch(setState(state))
    }
);

const createStoreWithMiddleware = applyMiddleware(
    remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter> 
            <App /> 
        </HashRouter>
    </Provider>
    ,
    document.getElementById('app')
);