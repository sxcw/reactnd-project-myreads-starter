import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

class Book extends React.Component {
  state = {
  }

  render() {
    const { book } = this.props;

    return (
      <li key={book.id}>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover'
              style={{
                  width: 128,
                  height: 192,
                  backgroundImage:`url(${book.imageLinks ? book.imageLinks.thumbnail: null})`
              }}>

            </div>
            <div className='book-shelf-changer'>
              <select value={book.shelf}
                onChange={(e) => this.handleChange(e.target.value)}>
                <option value='none' disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>{book.authors ? book.authors.join(', ').trim(',') : null}</div>
        </div>
      </li>
    )
  }

  handleChange(shelf){
    console.log(shelf, this.props.book)
    this.props.handleShelfChange(shelf, this.props.book);
  }
}

export default Book;
