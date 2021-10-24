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

    searchBooks(value) {
        if (value) {
            BooksAPI
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

    onMove(book, shelf) {
        BooksAPI
            .update(book, shelf)
            .then(searchResult => {
                this.setState({
                    searchResult: this.state.searchResult.filter(result => result.id !== book.id)
                })
            })
            .catch(err => {
                console.log('err', err)
            })
    }

    render() {
        const { searchValue, searchResult } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
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
                                    data={book}
                                    move={(book, shelf) => this.onMove(book, shelf)}
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