import React, {Component} from 'react';

class AccountBalance extends Component {
    render() {
        return (
            <div id="balanceInfo">
                Balance: {this.props.accountBalance}
            </div>
        );
    }
}

export default AccountBalance;