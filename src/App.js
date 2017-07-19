import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
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

        <Route exact path="/" render={() => (
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
              <Link to="/search"></Link>
            </div>
          </div>
        )}
       />

        <Route exact path="/search" component={SearchPage}/>

      </div>
    )
  }
}

export default BooksApp
