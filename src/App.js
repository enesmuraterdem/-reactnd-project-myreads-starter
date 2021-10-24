import React, { Component } from 'react'
import './App.css'
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Main, Search } from './Components'; 

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
