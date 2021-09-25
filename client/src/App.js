import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Customer from './Components/Customer/Customer';
import Admin from './Components/Admin/Admin';

import axios from 'axios';
class App extends Component {
  render() {

    return (
      <>
      <Router>
        <Switch>
          <Route path='/' exact component={Customer}></Route>
          <Route path='/admin' component={Admin}></Route>
          <Route path='/categories' component={Customer}></Route>
          <Route path='/products' component={Customer}></Route>
          <Route path='/search' component={Customer}></Route>
          <Route path='/login' exact component={Customer}></Route>
          <Route path='/contract' exact component={Customer}></Route>
          <Route path='/order' exact component={Customer}></Route>
          <Route path='/productDetails' exact component={Customer}></Route>
        </Switch>
      </Router>
    </>
    );
  }
}

export default App;
