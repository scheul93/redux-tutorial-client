import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

export class Voting extends PureComponent {
    render() {
        return (
            <div>
                { this.props.winner ?
                    <Winner ref="winner" winner={this.props.winner} /> :
                    <Vote {...this.props} />
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pair: state.getIn(['vote', 'pair']),
        hasVoted: state.get('hasVoted'),
        winner: state.get('winner')
    }
}

export default connect(mapStateToProps, actionCreators)(Voting);
