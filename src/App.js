import React, {Component} from 'react';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';

import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Credit from './components/Credit';
import Debit from './components/Debit';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: 
      {
        userName: 'John',
        memberSince: '07/23/96',
      },
      credit: [],
      debit: [],
      totalCredit: 0
    }
  }

  componentDidMount() {
    this.getCredit();
  }

  getCredit() {
    let creditApi = "https://moj-api.herokuapp.com/credits";

    axios.get(creditApi)
    .then((response) => {
      let credit = response.data;

      this.setState({credit});
      this.setState({totalCredit: this.calcTotal(credit)});
    })

    .catch((error) =>
    {
      this.setState({credit: [] });
    })
  }

  calcTotal(data) {
    return data.reduce((total, currentAmount) => {
      
      total += currentAmount.amount;
      return total;

    }, 0);
  }


  addCredit = (event) => {
    event.preventDefault();

    let creditDescription = event.target.description.value;
    let creditAmount = event.target.amount.value;
    let date = new Date().toISOString();

    let newCredit = {
      description: creditDescription,
      amount: Number(creditAmount),
      date: date
    }

    let creditData = new Array(...this.state.credit, newCredit);
    this.setState({credit: creditData});
    this.setState({totalCredit:this.state.totalCredit+newCredit.amount});
    event.target.reset();
  }

  addDebit = (event) => {
    event.preventDefault();

    let debitDescription = event.target.description.value;
    let debitAmount = event.target.amount.value;
    let date = new Date().toISOString();

    let newDebit = {
      description: debitDescription,
      amount: Number(debitAmount),
      date: date
    }

    let debitData = new Array(...this.state.debit, newDebit);
    this.setState({debit: debitData});
    this.setState({totalCredit:(this.state.totalCredit)-newDebit.amount});
    event.target.reset();
  }

  mockLogIn = (logInInfo) => {
    const newUser = {...this.state.currentUser}
    newUser.userName = logInInfo.userName
    this.setState({currentUser: newUser})
  }

  render() {
    let HomeComponent = () => (<Home accountBalance={this.state.accountBalance}/>);
    
    let UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    );

    let CreditComponent = () => (
      <Credit 
        data = {this.state.credit}
        addCredit = {this.addCredit}
        accountBalance = {this.state.totalCredit.toFixed(2)}
      />
    );

    let DebitComponent= () =>(
      <Debit
      data={this.state.debit}
      addDebit={this.addDebit}
      accountBalance={this.state.totalCredit.toFixed(2)}
      />
    );

    let LogInComponent = () => (<Login user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props} />);

    
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={HomeComponent}/>
            <Route exact path="/userProfile" render={UserProfileComponent}/>
            <Route exact path="/login" render={LogInComponent}/>
            <Route exact path="/credit" render={CreditComponent}/>
            <Route exact path="/debit" render={DebitComponent}/>
          </Switch>
        </Router>
    );
  }
}

export default App;
