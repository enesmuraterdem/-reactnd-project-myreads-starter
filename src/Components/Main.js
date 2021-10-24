import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI.js'
import { Bookshelf } from './';
import { Link } from 'react-router-dom';

class Main extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
    }

    componentDidMount() {
        this.getAllBooks();
    }

    getAllBooks() {
        BooksAPI
            .getAll()
            .then(books => {
                this.setState({
                    currentlyReading: this.getBooksByType(books, 'currentlyReading'),
                    wantToRead: this.getBooksByType(books, 'wantToRead'),
                    read: this.getBooksByType(books, 'read'),
                })
            })
    }
    
    getBooksByType(books, type) {
        return books.filter(book => book.shelf === type);
    }

    onMove(book, shelf) {
        BooksAPI
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
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <Bookshelf
                        title="Currently reading"
                        books={this.state.currentlyReading}
                        moveBook={(book, shelf) => this.onMove(book, shelf)}
                    />
                    <Bookshelf
                        title="Want to read"
                        books={this.state.wantToRead}
                        moveBook={(book, shelf) => this.onMove(book, shelf)}
                    />
                    <Bookshelf
                        title="Read"
                        books={this.state.read}
                        moveBook={(book, shelf) => this.onMove(book, shelf)}
                    />
                </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Main;