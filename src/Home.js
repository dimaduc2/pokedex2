//Phần 1: các Import
import React, { Component } from 'react'
import logo from './logo.svg';
import { Toast, ToastContainer } from 'react-bootstrap';
class Home extends Component {

//Phần 2: các State
  state = {}

//Phần 3: các Function

  render() {
    return (
      <div className="Home">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}
export default Home;