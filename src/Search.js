import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends Component {
  state = {
    query: "",
    newBooks: [],
    erreur: false
  };

  getBooks = (e) => {
    BooksAPI.search(e.target.value.trim(), 20).then(books =>{
        books.length > 0 ? this.setState({ newBooks: books, erreur: false}): this.setState({newBooks:[], erreur: true})
    })
  };


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.getBooks}/>
          </div>
        </div>
        <div className="search-books-results">
         {this.state.newBooks.length>0 && (
             <div>
                 <h3> Search return {this.state.newBooks.length} books :</h3>
          <ol className="books-grid">
            {this.state.newBooks.map(book => (
              <Book
              book={book}
              books = {this.props.books}
              key={book.id}
              change_it={this.props.change}
            />
            ))}
          </ol>
          </div>
          )}
        </div>
      </div>
    );
  }
}
export default Search;
