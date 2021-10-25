import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI.js'
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
    state = {
        searchValue: '',
        searchResult: []
    }

    searchTimeout = null;

    onSearch(e) {
        const searchValue = e.target.value;

        this.setState({
            searchValue
        }, () => {
            clearInterval(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.searchBooks(searchValue);
            }, 250);
        })
    }

    async searchBooks(value) {
        if (value) {
            await BooksAPI
                .search(value)
                .then(searchResult => {
                    this.setState({
                        searchResult: searchResult.error ? [] : searchResult
                    })
                })
                .catch(err => {
                    console.log('err', err)
                })
        } else {
            this.setState({
                searchResult: []
            })
        }
    }

    getBookShelf(id) {
        const { currentlyReading, wantToRead, read } = this.props;
        const myReads = [...currentlyReading, ...wantToRead, ...read];

        const book = myReads.find(book => book.id === id);

        return book && book.shelf;
    }


    render() {
        const { searchValue, searchResult } = this.state;
        const { onMove } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={e => this.onSearch(e)}
                            value={searchValue}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            searchResult.map((book, index) => (
                                <Book
                                    key={book.id}
                                    data={{
                                        ...book,
                                        shelf: this.getBookShelf(book.id)
                                    }}
                                    move={(book, shelf) => onMove(book, shelf)}
                                />
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search