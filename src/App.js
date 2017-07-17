import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
//Routes
import SearchPage from './Routes/SearchPage.js'
//Components
import CurrentlyReading from './Components/MainPage/CurrentlyReading.js'
import WantToRead from './Components/MainPage/WantToRead.js'
import Read from './Components/MainPage/Read.js'

import Header from './Components/MainPage/Header.js'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div>
            <Route exact path="/search" component={SearchPage}/>
          </div>
        ) : (
          <div>
            <Header/>
            <div className="list-books-content">
              <div>
                <CurrentlyReading/>
                <WantToRead/>
                <Read/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
