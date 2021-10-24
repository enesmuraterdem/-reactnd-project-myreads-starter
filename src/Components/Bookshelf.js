import React, { Component } from 'react'
import BookList from './BookList'

class Bookshelf extends Component {

    render() {
        const { title, books, moveBook } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BookList
                        books={books}
                        moveBook={(book, shelf) => moveBook(book, shelf)}
                    />
                </div>
            </div>
        )
    }
}

export default Bookshelf;