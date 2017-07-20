import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'


class SearchPage extends Component {

  static propTypes = {
  books: PropTypes.array.isRequired,
}

  state = {
    query: ' ',
    filter: 'all'
  }

    updateQuery = (query) => {
      this.setState({ query: query.trim() })
    }

    clearQuery = (query) => {
      this.setState({ query: '' })
    }


  render() {

    const { books } = this.props
    const { query } = this.state


    let showingBooks
    if (query) {
      const optimizedquery = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => optimizedquery.test(`${book.title} ${book.authors}`))
    } else {
      showingBooks = books
    }


    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${book.imageLinks.smallThumbnail}`}}></div>
                    <div className="book-shelf-changer">
                      <select>
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




export default SearchPage
