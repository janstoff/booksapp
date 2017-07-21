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
    changeSelection: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksOnShelf) => {
      this.setState({booksOnShelf : booksOnShelf})
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update();
  }


  render() {

    const { booksOnShelf } = this.state
  
    return (
      <div className="app">
            {console.log(this.state.booksOnShelf)}
        <Route exact path="/" render={() => (
          <div>
            <Header/>
            <div className="list-books-content">
                <BookShelf
                  title = "Currently Reading"
                  booksOnShelf = {booksOnShelf.filter((book) => book.shelf === "currentlyReading")}
                />
                <BookShelf
                  title = "Want to Read"
                  booksOnShelf = {booksOnShelf.filter((book) => book.shelf === "wantToRead")}
                />
                <BookShelf
                  title = "Read"
                  booksOnShelf = {booksOnShelf.filter((book => book.shelf === "read"))}
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
          />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
