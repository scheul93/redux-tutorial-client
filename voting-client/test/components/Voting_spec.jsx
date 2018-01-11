import React from 'react';
import ReactDOM from 'react-dom';
import { 
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate
 } from 'react-dom/test-utils';
import { List } from 'immutable';
import { Voting } from '../../src/components/Voting';
import { expect } from 'chai';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["Parks and Rec", "The Office"]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal("Parks and Rec");
        expect(buttons[1].textContent).to.equal("The Office");
    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={["Parks and Rec", "The Office"]} vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);
        expect(votedWith).to.equal("Parks and Rec");
    })

    it('disabled buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={["Parks and Rec", "The Office"]} hasVoted="Parks and Rec" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    })

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={["Parks and Rec", "The Office"]} hasVoted="Parks and Rec" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons[0].textContent).to.contain('Voted');
    })

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner="Parks and Rec" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain("Parks and Rec");
    })

    it('renders as a pure component', () => {
        const pair = List.of("Parks and Rec", "The Office");
        const container = document.createElement('div');
        let component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Parks and Rec');

        const newPair = pair.set(0, 'Wentworth');
        component = ReactDOM.render(
            <Voting pair={pair} />,
            container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('Parks and Rec');
    })
});