import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />

                    <h1 id="title">Bank of React</h1>

                    <Link id="buttons" to="/login">
                        <button><p>Click to Login</p></button>
                    </Link>
                </div>
            </div>
            
        );
    }
}

export default Home;