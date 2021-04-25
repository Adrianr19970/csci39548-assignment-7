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
      credit: [], //array w/ all credit products
      debit: [], //array w/ all debit products
      totalCredit: 0 //total balance
    }
  }

  componentDidMount() { //for the APIs
    this.getCredit();
    this.getDebit();
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
  //Helper for calculating credit api total
  calcTotal(data) {
    return data.reduce((total, currentAmount) => {
      
      total += currentAmount.amount;
      return total;

    }, 0);
  }
  getDebit() {
    let debitApi = "https://moj-api.herokuapp.com/debits";

    axios.get(debitApi)
    .then((response) => {
      let debit = response.data; //an array of all products from api
      
      let subFromTotal = (this.state.totalCredit); //This is current balance

      //For every product (debit[i]) in debit array, subtract the amount from total
      for(let i=0; i<debit.length; i++)
      {
        //console.log(debit[i].amount)
        subFromTotal-=debit[i].amount; //subtract from current balance, each debit product's amount
      }
        
      this.setState({debit}); //this sets debit array to debit
      this.setState({totalCredit:subFromTotal}); //this sets the total balance to the calculated total 
    })

    .catch((error) =>
    {
      this.setState({credit: [] });
    })
  }
  

  addCredit = (event) => {
    event.preventDefault();

    let creditDescription = event.target.description.value;
    let creditAmount = event.target.amount.value;
    let date = new Date().toISOString();
    
    //console.log(isNaN(creditAmount)===false);
    if(isNaN(creditAmount)===false) //if credit amount is not a number = false , meaning it is a number, add as credit
    {
      
      let newCredit = {
        description: creditDescription,
        amount: Number(creditAmount),
        date: date
      }

      let creditData = new Array(...this.state.credit, newCredit);
      this.setState({credit: creditData});
      this.setState({totalCredit:this.state.totalCredit+newCredit.amount});
    }
    
    event.target.reset();
  }

  addDebit = (event) => {
    event.preventDefault();

    let debitDescription = event.target.description.value;
    let debitAmount = event.target.amount.value;
    let date = new Date().toISOString();

    if(isNaN(debitAmount)===false) //if debit amount is not a number = false , meaning it is a number, add as debit
    {
      let newDebit = {
        description: debitDescription,
        amount: Number(debitAmount),
        date: date
      }
  
      let debitData = new Array(...this.state.debit, newDebit);
      this.setState({debit: debitData});
      this.setState({totalCredit:(this.state.totalCredit)-newDebit.amount});
    }
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
