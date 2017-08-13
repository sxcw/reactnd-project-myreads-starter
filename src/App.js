import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css';
import Books from './Books';
import Search from './Search';
import PageNotFound from './PageNotFound';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render () {
    const { books } = this.state;
    console.log(books)
    return (
      <div>
        <Switch>
          <Route exact path='/' render={() => (
            <Books
              books={books}
            />
          )} />
          <Route path='/search' render={({ history }) => (
            <Search
            />
          )}/>
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
