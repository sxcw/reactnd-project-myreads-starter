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
    BooksAPI.getAll()
    .then((books) => {
      this.setState({ books })
    })
    .catch(error => console.log('error:', error))
  }

  getShelf(target) {
    return this.state.books.find(book => book.id === target.id).shelf;
  }

  handleShelfChange(shelf, selectedBook) {
    const self = this;

    BooksAPI.update(selectedBook, shelf)
    .then(booksWithUpdatedShelf => {
      if (self.state.searchResults) {
        const searchResults = self.state.searchResults.map(book => {
          if (book.id === selectedBook.id) {
            book.shelf = shelf;
          }
          return book;
        })

        self.setState({ searchResults })
      }
        self.getAllBooks();
    })
    .catch(error => console.log('error:', error))
  }

  handleAddShelfForBooks(self, books) {
    const ids = self.state.books.map(book => book.id);
    const updatedBooks = books.reduce((res, curr) => {
      if (ids.indexOf(curr.id) === -1) {
        curr.shelf = 'none';
        res.originals.push(curr);
      } else {
        const updatedShelf = self.getShelf(curr);
        curr.shelf = updatedShelf;
        res.updated.push(curr);
      }

      return res;
    }, {originals: [], updated: []});

    const searchResults = updatedBooks.originals.concat(updatedBooks.updated);
    self.setState({ searchResults })
  }

  handleSearch(term) {
    const self = this;

    BooksAPI.search(term, 20)
    .then(books => {
      if (!books || books.error) {
        self.setState({ searchResults: null })
        return;
      }

      self.handleAddShelfForBooks(self, books);
    })
    .catch(error => console.log('error:', error))
  }
};

export default App;
