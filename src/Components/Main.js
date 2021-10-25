import React, { Component } from 'react';
import { Bookshelf } from './';
import { Link } from 'react-router-dom';

class Main extends Component {

    render() {
        const { onMove, currentlyReading, wantToRead, read } = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Bookshelf
                            title="Currently reading"
                            books={currentlyReading}
                            moveBook={(book, shelf) => onMove(book, shelf)}
                        />
                        <Bookshelf
                            title="Want to read"
                            books={wantToRead}
                            moveBook={(book, shelf) => onMove(book, shelf)}
                        />
                        <Bookshelf
                            title="Read"
                            books={read}
                            moveBook={(book, shelf) => onMove(book, shelf)}
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