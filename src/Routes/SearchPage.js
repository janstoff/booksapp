import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../BooksAPI'


class SearchPage extends Component {

  static propTypes = {
  books: PropTypes.array.isRequired,
}

  state = {
    searchResults: [],
  }

    updateSearchResults = (query) => {
     if (query) {
       BooksAPI
       .search(query.trim(), 10)
       .then((searchResults) => {
         this.setState({searchResults})
       })
     } else {
       this.setState({searchResults: []})
     }
    }


  render() {

    const { searchResults } = this.state


    return (
      <div>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateSearchResults(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults.map((book) => (
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




export default SearchPage
