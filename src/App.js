import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI.js'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Main, Search } from './Components';

class BooksApp extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  async componentDidMount() {
    await this.getAllBooks();
  }

  async getAllBooks() {
    await BooksAPI
      .getAll()
      .then(books => {
        this.setState({
          currentlyReading: this.getBooksByType(books, 'currentlyReading'),
          wantToRead: this.getBooksByType(books, 'wantToRead'),
          read: this.getBooksByType(books, 'read'),
        })
      })
  }

  getBooksByType(books, type) {
    return books.filter(book => book.shelf === type);
  }

  async onMove(book, shelf) {
    await BooksAPI
      .update(book, shelf)
      .then(resultData => {
        this.getAllBooks()
      })
      .catch(err => {
        console.log('err', err)
      })
  }


  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/">
              <Main
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                onMove={(book, shelf) => this.onMove(book, shelf)}
              />
            </Route>
            <Route exact path="/search">
              <Search
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
                onMove={(book, shelf) => this.onMove(book, shelf)}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default BooksApp
