import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Book extends Component {

    static propTypes = {
        bookData: PropTypes.object.isRequired,
        onShelfChange: PropTypes.func.isRequired
    }

    handleChange(event) {
        console.log(event.target.value)
        console.log(event.target.id)
    }

    onHandleChange = (book, evt) => {
        console.log("In book: Book id {}", book)
        console.log("In shelf: shelf value {}", evt.target.value)
        this.props.onShelfChange(book, evt.target.value)
    }

    render() {

        const { bookData, shelfValue } = this.props

        return (
            <div className='book'>
                <div className='book-top'>
                    <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${bookData.imageLinks.smallThumbnail})` }}>
                        <div className='book-shelf-changer'>
                            <select value={shelfValue} onChange={this.onHandleChange.bind(this, bookData)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='book-title'>{bookData.title}</div>
                <div className='book-authors'>{bookData.authors}</div>
            </div>

        )
    }
}

export default Book