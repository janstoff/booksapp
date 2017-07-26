import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
//Backend
import * as BooksAPI from './BooksAPI'
//Style
import './App.css'
//Routes
import SearchPage from './Routes/SearchPage.js'
//Components
import Header from './Components/MainPage/Header.js'
import BookShelf from './Components/MainPage/BookShelf.js'


class BooksApp extends Component {

  state = {
    booksOnShelf: [],
    searchResults: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((allReturnedBooks) => {
      this.setState({booksOnShelf : allReturnedBooks})
    })
  }

  handleSearch = (query) => {
   if (query !== ' ') {
     BooksAPI
     .search(query.trim(), 10)
     .then((allSearchResults) => {
       if (allSearchResults && allSearchResults.length) {
         this.setState({searchResults: allSearchResults.filter((item) => item.shelf === "none")})
       } else {
         this.setState({searchResults: []})
       }
     })
   }
  }

    handleChange = (bookToMove, shelfSelected) => {
      BooksAPI.update(bookToMove, shelfSelected)
        .then(() => {
          this.setState((state) => {
            let newShelfState = state.booksOnShelf.map(book => {
              book.id === bookToMove.id && (book.shelf = shelfSelected);
              return book;
            });
            return {booksOnShelf: newShelfState};
          })
        })
    }

    handleAddFromSearch = (bookToAdd, shelfSelected) => {
      BooksAPI.update(bookToAdd, shelfSelected)
        .then(() => {
          BooksAPI.get(bookToAdd.id)
          .then((bookRetrieved) => {
            this.setState((state) => {
              let newShelfState = state.booksOnShelf.concat(bookRetrieved);
              return {booksOnShelf: newShelfState}
            })
            this.setState({searchResults: this.state.searchResults.filter((item) => item.id !== bookRetrieved.id)})
          })
        })
    }



  render() {

    const { booksOnShelf, searchResults } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>
            <Header/>
            <div className="list-books-content">
                <BookShelf
                  title = "Currently Reading"
                  booksOnShelf = {booksOnShelf.filter((book) => book.shelf === "currentlyReading")}
                  onChangeShelf={this.handleChange}
                />
                <BookShelf
                  title = "Want to Read"
                  booksOnShelf = {booksOnShelf.filter((book) => book.shelf === "wantToRead")}
                  onChangeShelf={this.handleChange}
                />
                <BookShelf
                  title = "Read"
                  booksOnShelf = {booksOnShelf.filter((book => book.shelf === "read"))}
                  onChangeShelf={this.handleChange}
                />
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
        )}
       />

        <Route exact path="/search" render={() => (
          <SearchPage
            searchResults={searchResults}
            onChangeShelf={this.handleAddFromSearch}
            onSearch={this.handleSearch}
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;
