import React from 'react';
import ReactDOM from 'react-dom';
import { 
    renderIntoDocument,
    scryRenderedDOMComponentsWithClass,
    Simulate
 } from 'react-dom/test-utils';
 import {List, Map} from 'immutable';
 import { Results } from '../../src/components/Results';
 import {expect} from 'chai';

 describe('Results', () => {
     it('renders entries with vote counts or zero', () => {
         const pair = List.of('Parks and Rec', 'The Office');
         const tally = Map({'Parks and Rec': 5});
         const component = renderIntoDocument(
             <Results pair={pair} tally={tally} />
         );
         const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
         const [pr, office] = entries.map(e => e.textContent);

         expect(entries.length).to.equal(2);
         expect(pr).to.contain('Parks and Rec');
         expect(pr).to.contain('5');
         expect(office).to.contain('The Office');
         expect(office).to.contain('0');
     });

     it('invokes the next callback when next button is clicked', () => {
         let nextInvoked = false;
         const next = () => nextInvoked = true;

         const pair = List.of('Parks and Rec', 'The Office');
         const component = renderIntoDocument(
             <Results pair={pair}
                        tally={Map()}
                        next={next} />
         );
         Simulate.click(ReactDOM.findDOMNode(component.refs.next));
         expect(nextInvoked).to.equal(true);
     });

     it('renders the winner when there is one', () => {
        const component = renderIntoDocument(
            <Results winner="Parks and Rec"
                        pair={["Parks and Rec", "The Office"]}
                        tally={Map()} />
        );
        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Parks and Rec');
     });
 })