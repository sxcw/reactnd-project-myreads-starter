import React from 'react';
import './App.css';

class Book extends React.Component {
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
              <select value={book.shelf ? book.shelf : 'none'}
                onChange={(e) => this.handleChange(e.target.value)}>
                <option value='label' disabled>Move to...</option>
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
    this.props.handleShelfChange(shelf, this.props.book);
  }
};

export default Book;
