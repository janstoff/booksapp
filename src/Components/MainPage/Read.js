import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from '../../BooksAPI'


class Read extends Component {

  static propTypes = {
  books: PropTypes.array.isRequired,
}

  render () {

    const { books } = this.props

    let booksRead = books.filter((book) => book.shelf === "read")

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksRead.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail}`}}></div>
                    <div className="book-shelf-changer">
                      <select defaultValue={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.join(', ')}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Read;
