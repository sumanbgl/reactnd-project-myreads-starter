import React, { Component } from 'react'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import Search from './Search'

const classifyBooks = (books) => {
    let currentlyReading = []
    let wantToRead = []
    let read = []

    currentlyReading.push(books
        .filter((book) =>
            (book.shelf === 'currentlyReading')))

    wantToRead.push(books
        .filter((book) =>
            (book.shelf === 'wantToRead')))

    read.push(books
        .filter((book) =>
            (book.shelf === 'read')))

    // console.log(currentlyReading)
    // console.log(wantToRead)
    // console.log(read)

    let shelves = {
        "Currently Reading": currentlyReading,
        "Want To Read": wantToRead,
        "Read": read
    }

    //console.log(shelves)
    return shelves
}

async function updateBookShelf(book, shelfValue) {
    await BooksAPI.update(book, shelfValue)
}

class App1 extends Component {
    state = {
        books: []
    }

    shelfUpdateHandler = (book, newShelfValue) => {
        console.log("App book id : {}", book)
        console.log("New shelf value : {}", newShelfValue)

        updateBookShelf(book, newShelfValue)

        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    render() {
        return (
            <div className='app'>
                <Route exact path='/' render={() => (
                    <ListBooks books={this.state.books} shelfUpdateHandler={this.shelfUpdateHandler} />
                )} />
                <Route path='/search' render={({ history }) => (
                    <Search shelfUpdateHandler={this.shelfUpdateHandler} />
                )} />
                {/* <div className='open-search'>
                    <button>Add a Book</button>
                </div> */}
            </div>
        )
    }
}

export default App1