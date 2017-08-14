import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Book from './Book';

class Search extends React.Component {
  state = {
    term: ''
  }

  componentWillUnmount() {
    this.handleSearchBooks(null);
  }

  render() {
    return (
      <div className='app'>
          <div className='search-books'>
            <div className='search-books-bar'>
              <Link to='/' className='close-search'>Close</Link>
              <div className='search-books-input-wrapper'>
                <input type='text'
                  placeholder='Search by title or author'
                  onChange={(e) => this.handleSearchBooks(e.target.value)} />
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
    const { books } = this.props;

    if (!books || books.error) {
      return (
        <div>Please enter a valid search term</div>
      );
    }

    if (Array.isArray(books) && !books.length) {
      return (
        <div>No books</div>
      );
    }

    return books.map(book => <Book book={book}
                              key={book.id}
                              handleShelfChange={this.props.handleShelfChange} />);
  }

  handleSearchBooks(term) {
    this.props.handleSearch(term);
  }
};

export default Search;
