import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css';
import Books from './Books';
import Search from './Search';
import PageNotFound from './PageNotFound';

class App extends Component {
  state = {
    books: [],
    searchResults: null
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render () {
    const { books, searchResults } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            <Books
              books={books}
              handleShelfChange={this.handleShelfChange.bind(this)}
            />
          )} />
          <Route path='/search' render={({ history }) => (
            <Search
              books={searchResults}
              handleSearch={this.handleSearch.bind(this)}
              handleShelfChange={this.handleShelfChange.bind(this)}
            />
          )}/>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }

  getAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  getShelf(target) {
    return this.state.books.find(book => book.id == target.id).shelf;
  }

  handleShelfChange(shelf, book) {
    BooksAPI.update(book, shelf)
    .then((book) => {
      this.getAllBooks()
    })
  }

  handleSearch(term) {
    const self = this;
    const originals = [];
    const updated = []
      BooksAPI.search(term, 20)
      .then((books) => {

        if (!books) {
          self.setState({ searchResults: null })
          return;
        }

        const ids = self.state.books.map(book => book.id);
        // const booksInShelf = books.filter(book => {
        //   if (ids.indexOf(book.id) === -1) {
        //     originals.push(book);
        //     return false;
        //   }
        //   return true;
        //   }).map(book => {
        //     const shelf = self.getShelf(book);
        //     book.shelf = shelf;
        //     return book;
        //   })

          const updatedBooks = books.reduce((res, curr) => {
            if (ids.indexOf(curr.id) === -1) {
              res.originals.push(curr)
            } else {
              const shelf = self.getShelf(curr);
              curr.shelf = shelf;
              res.updated.push(curr)
            }
            return res;
          }, {originals: [], updated: []})
          console.log('updated:', updatedBooks);
        const searchResults = updatedBooks.originals.concat(updatedBooks.updated)
        console.log('searchResults', searchResults)
        self.setState({ searchResults })
      })
      .catch(error => console.log('error:', error))
  }

}

export default App;
