import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App1 from './App1'
import './index.css'

ReactDOM.render(<BrowserRouter>
    <App1 />
</BrowserRouter>, document.getElementById('root'))
