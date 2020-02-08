import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
  state = {
    newBooks: [],
    error: false,
    query: ""
  };

  // Search for the books using a query
  getBooks = e => {
    const query = e.target.value;
    this.setState({ query });
    if (query) {
      BooksAPI.search(query.trim(), 20)
        .then(books => {
          books.length > 0
            ? this.setState({ newBooks: books, erreur: false })
            : this.setState({ newBooks: [], error: true });
        })
        .catch(e =>
          this.setState(() => ({
            error: true
          }))
        );
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.getBooks}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.newBooks.length > 0 && this.state.query.length > 0 && (
            <div>
              <h3> Search returns {this.state.newBooks.length} books :</h3>
              <ol className="books-grid">
                {this.state.newBooks.map(book => (
                  <Book
                    book={book}
                    books={this.props.books}
                    key={book.id}
                    change_it={this.props.change}
                  />
                ))}
              </ol>
            </div>
          )}
          {this.state.error && <h3>No results try another research key</h3>}
        </div>
      </div>
    );
  }
}
export default Search;
