import React from 'react'
import Book from './Book'

class BookList extends React.Component {
    render() {
        const { books, moveBook } = this.props;
        return (
            <ol className="books-grid">
                {
                    books.map((book, index) => (
                        <Book
                            key={book.id}
                            data={book}
                            move={(book, shelf) => moveBook(book, shelf)}
                        />
                    ))
                }
            </ol>
        )
    }
}

export default BookList