import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AccountBalance from './AccountBalance';
import CreditDisplay from './CreditDisplay';

class Credit extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = props.addCredit.bind(this.handleSubmit);
    }

    render()
    {
        return (
            <div id="credit">
                <h1>Credit Overview</h1>
                <div id="directory">
                    <label>Directory</label>
                    <Link id="buttons" to="/userProfile"><button><p>My Profile</p></button></Link>
                    <Link id="buttons" to="/debit"><button><p>View Debits</p></button></Link>
                    <Link id="buttons" to="/"><button><p>Logout</p></button></Link>
                </div>

                <AccountBalance accountBalance={this.props.accountBalance} />


                <div id="addCredit">
                    <h3>Add Credit</h3>
                    <form id="buttons" onSubmit={this.handleSubmit}>
                        <label>Description: </label>
                        <input name="description" placeholder="Name of Item" required />

                        <br></br>

                        <label>Amount (USD): </label>
                        <input name ="amount" placeholder="100.00" required />

                        <br></br>

                        <button type="submit"><p>Submit</p></button>
                    </form>
                </div>
                

                <section id="listItems">
                    {this.dataDisplay(this.props.data)}
                </section>
            </div>
        );
    }

    dataDisplay(data) {
        let display = [];

        data.forEach((element, index) => {
            const description = element.description;
            const amount = element.amount;
            const date = element.date;

            display.push(
                <CreditDisplay
                    key = {index.toString()}
                    description = {description}
                    amount = {amount}
                    date = {date}
                />
            );
        })
        return display;
    }
}

export default Credit;