import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books /*books: books*/})
    })
  }

  render() {
    return (
      <div className="app">
            {console.log(this.state.books)}
        <Route exact path="/" render={() => (
          <div>
            <Header/>
            <div className="list-books-content">
                <CurrentlyReading
                  books = {this.state.books}
                />
                <WantToRead
                  books = {this.state.books}
                />
                <Read
                  books = {this.state.books}
                />
            </div>
            <div className="open-search">
              <Link to="/search"></Link>
            </div>
          </div>
        )}
       />
        <Route exact path="/search" render={() => (
          <SearchPage books={this.state.books}/>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
