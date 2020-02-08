import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, Route, Switch } from "react-router-dom";
import Search from "./Search";
import "./App.css";
import Book from "./Book";

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.change = this.change.bind(this);
  }
  state = {
    books: [],
    showSearchPage: false
  };
  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({
        books:books
      })
    );
  }
  change = (modifiedBook, e) => {
    const value = e.target.value;
    modifiedBook.shelf=value
    BooksAPI.update(modifiedBook, value)
      .then(response => {
        this.setState(oldState => ({
          books: oldState.books.filter(book=> book.id!== modifiedBook.id).concat(modifiedBook)
        }))
      })
      .catch(e => console.log("error" + e));
  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            path="/search"
            render={() => (
              <Search books={this.state.books} change={this.change}/>
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.books.map(
                            book =>
                              book.shelf === "currentlyReading" && (
                                <Book
                                  book={book} books={this.state.books}
                                  key={book.id}
                                  change_it={this.change}
                                />
                              )
                          )}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Want to Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.books.map(
                            book =>
                              book.shelf === "wantToRead" && (
                                <Book
                                book={book} books={this.state.books}
                                key={book.id}
                                  change_it={this.change}
                                />
                              )
                          )}
                        </ol>
                      </div>
                    </div>
                    <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {this.state.books.map(
                            book =>
                              book.shelf === "read" && (
                                <Book
                                book={book} books={this.state.books}
                                key={book.id}
                                  change_it={this.change}
                                />
                              )
                          )}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search" className="open-search">
                    Add a book
                  </Link>
                </div>
              </div>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
