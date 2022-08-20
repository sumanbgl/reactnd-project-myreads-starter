import React, { Component } from 'react'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import './App.css'

async function booksSearch(searchString) {
    let books = await BooksAPI.search(searchString)
    return books;
}

class Search extends Component {
    state = {
        showSearchPage: false,
        query: '',
        books: []
    }

    updateQuery = (query) => {
        console.log(query)
        this.setState(() => ({
            query: query.trim()
        }))
        if (query === '') {
            this.setState(() => ({
                books: []
            }))
        } else {
            // BooksAPI.search(this.state.query)
            //     .then((books) => {
            //         this.setState(() => ({
            //             books
            //         }))
            //     })
            // .catch((books) => {
            //     this.setState(() => ({
            //         books: []
            //     }))
            // })
            BooksAPI.search(this.state.query)
                .then((books) => {
                    books.filter((book) => book.hasOwnProperty("imageLinks"))
                }).then((books) => {
                    this.setState(() => ({
                        books
                    }))
                })
        }

    }

    // handleChange(event) {
    //     this.setState(() => ({
    //         query: event.target.value
    //     }))
    // }

    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state
        const { shelfUpdateHandler } = this.props

        // const showingBooks = query === ''
        //     ? ''
        //     : books.filter((book) => (
        //         ((book.title.toLowerCase().includes(query.toLowerCase())
        //             ||
        //             book.authors.toLowerCase().includes(query.toLocaleLowerCase()))
        //             //TODO: check for missing thumbnails

        //         )))
        // const showingBooks = query === '' ? '' : BooksAPI.search(this.state.query).then((books) => console.log(books))
        console.log(this.state.books)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
                    <Link to="/">
                        <button className='close-search'>Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)} />

                    </div>
                </div>
                {this.state.books &&
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {this.state.books.map((book) => (


                                <li key={book.id}>
                                    <Book bookData={book} shelfValue="none" onShelfChange={shelfUpdateHandler} />
                                </li>

                            ))
                            }
                        </ol>
                    </div>
                }
            </div>
        )
    }
}

export default Search
