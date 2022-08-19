import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import './App.css'

class ListBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        shelfUpdateHandler: PropTypes.func.isRequired
    }

    getBooksByCategory(books, category) {
        let results = []
        for (let i = 0; i < books.length; i++) {
            if (books[i].shelf === category) {
                results.push(books[i])
            }
        }
        return results
    }

    render() {

        const { books, shelfUpdateHandler } = this.props

        let currentlyReading = this.getBooksByCategory(books, 'currentlyReading')
        let wantToRead = this.getBooksByCategory(books, 'wantToRead')
        let read = this.getBooksByCategory(books, 'read')

        console.log(currentlyReading)

        return (
            <div>
                <div className='list-books'>
                    <div className='list-books-title'>
                        <h1>MyReads</h1>
                    </div>
                    <div className='list-books-content'>
                        <div className='bookshelf'>
                            <h2 className='bookshelf-title'> Currently Reading</h2>
                            <div className='bookshelf-books'>
                                <ol className='books-grid'>
                                    {currentlyReading.map((book) => (
                                        <li key={book.id}>
                                            <Book bookData={book} shelfValue="currentlyReading" onShelfChange={shelfUpdateHandler} />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className='bookshelf'>
                            <h2 className='bookshelf-title'> Want To Read</h2>
                            <div className='bookshelf-books'>
                                <ol className='books-grid'>
                                    {wantToRead.map((book) => (
                                        <li key={book.id}>
                                            <Book bookData={book} shelfValue="wantToRead" onShelfChange={shelfUpdateHandler} />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                        <div className='bookshelf'>
                            <h2 className='bookshelf-title'> Read</h2>
                            <div className='bookshelf-books'>
                                <ol className='books-grid'>
                                    {read.map((book) => (
                                        <li key={book.id}>
                                            <Book bookData={book} shelfValue="read" onShelfChange={shelfUpdateHandler} />
                                        </li>
                                    ))
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <Link to='/search'>
                    <div className='open-search'>
                        <button>Add a Book</button>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ListBooks;