import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Book from './Book';

class Search extends React.Component {
  state = {
    books: [],
    term: ''
  }

  render() {
    console.log('search books~', this.state.books)
    return (
      <div className='app'>
          <div className='search-books'>
            <div className='search-books-bar'>
              <Link to='/' className='close-search'>Close</Link>
              <div className='search-books-input-wrapper'>
                <input type='text'
                  placeholder='Search by title or author'
                  onChange={(e) => this.handleSearch(e.target.value)} />
              </div>
            </div>
            <div className='search-books-results'>
              <ol className='books-grid'>
                {this.renderBooks()}
              </ol>
            </div>
          </div>
      </div>
    )
  }

  renderBooks() {
    const { books } = this.state;
    if (!books ||
        books.error ||
        Array.isArray(books) && !books.length) {
      return (
        <div>Please enter a valid search term</div>
      );
    }

    return books.map(book => <Book book={book} key={book.id} />);
  }

  handleSearch(term) {
      BooksAPI.search(term, 20)
      .then((books) => {
        this.setState({ books })
      })
      .catch(error => console.log('error:', error))
  }
}

export default Search;
