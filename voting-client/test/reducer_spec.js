import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Parks and Rec', 'The Office'),
                    tally: Map({ 'Parks and Rec': 1})
                })
            })
        };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Parks and Rec', 'The Office'],
                    tally: {'Parks and Rec': 1}
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Parks and Rec', 'The Office'],
                    tally: {'Parks and Rec': 1}
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        }));
    });

    it('handles VOTE by setting hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        });
        const action = {type: 'VOTE', entry: 'Parks and Rec'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            },
            hasVoted: 'Parks and Rec'
        }));
    });

    it('does not est hasVoted for VOTE on invalid entry', () => {
        const state = fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        });
        const action = {type: 'Vote', entry: 'Wentworth'};
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            }
        }))
    });

    it('removed hasVoted on SET_STATE if pair changes', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Parks and Rec', 'The Office'],
                tally: {'Parks and Rec': 1}
            },
            hasVoted: 'Parks and Rec'
        });
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Wentworth', 'Orange is the New Black']
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Wentworth', 'Orange is the New Black']
            }
        }));
    });
});