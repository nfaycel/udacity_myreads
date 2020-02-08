import React from "react";
import "./App.css";


const Book = props => {
  let book = props.book;
  // set current shelf to none as default
  var currentShelf = 'none';

  // if book is in current list, set current shelf to book.shelf
  for (let item of props.books) {
    if (item.id === book.id) {
      currentShelf = item.shelf;
      break;
    }
  }

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks?book.imageLinks.thumbnail:null}`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                defaultValue={
                    currentShelf
                }
                onChange={(e)=> props.change_it(book, e)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
              
            {book.authors && book.authors.map(
              (author, index) =>
                " " + author + (index < book.authors.length - 1 ? "," : "")
            )}
          </div>
        </div>
      </li>
    );
  };

  export default Book;
