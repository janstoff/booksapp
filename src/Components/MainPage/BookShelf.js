import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookShelf extends Component {

  static propTypes = {
  booksOnShelf: PropTypes.array.isRequired,
}


  render () {

    const { booksOnShelf, title } = this.props


    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksOnShelf.map((book) => (
              <li>
                <div key={book.id} className="book">
                  <div className="book-top">
                    {book.imageLinks.smallThumbnail && (
                      <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail}`}}></div>
                    )}
                    <div className="book-shelf-changer">
                      <select value={book.shelf}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors && (
                    <div className="book-authors">{book.authors.join(', ')}</div>
                  )}
                  {book.averageRating && (
                    <div className="book-rating">Rating:   {book.averageRating}</div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf;
