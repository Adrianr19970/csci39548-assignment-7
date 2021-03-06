import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserProfile extends Component {
    render() {
        return (
            <div id="user">
                <h1>User Profile</h1>
                <div id="info">
                    <div>Username: {this.props.userName}</div>
                    <div>Member Since: {this.props.memberSince}</div>
                </div>

                <div id="loginDirectory">
                    <h4>Directory</h4>
                    <Link id="buttons" to="/credit"><button><p>View Credit</p></button></Link>
                    <Link id="buttons" to="/debit"><button><p>View Debits</p></button></Link>
                    <Link id="buttons" to="/"><button><p>Logout</p></button></Link>
                </div>
            </div>
        );
    }
}

export default UserProfile;