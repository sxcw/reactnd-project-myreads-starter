import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book';

class Books extends React.Component {
  state = {
  }

  render() {
    const { books } = this.props;

    return (
      <div className='app'>
        <div className='list-books'>
          <div className='list-books-title'>
            <h1>MyReads</h1>
          </div>
          <div className='list-books-content'>
            <div>
              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Currently Reading</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {this.renderBooks(books, 'currentlyReading')}
                  </ol>
                </div>
              </div>

              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Want to Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {this.renderBooks(books, 'wantToRead')}
                  </ol>
                </div>
              </div>

              <div className='bookshelf'>
                <h2 className='bookshelf-title'>Read</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {this.renderBooks(books, 'read')}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className='open-search'>
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      </div>
    )
  }

  renderBooks(books, type) {
    if (!books) { return null; }

    return books.filter(book => book.shelf == type)
        .map(book => <Book book={book} key={book.id} />)
  }
}

export default Books
