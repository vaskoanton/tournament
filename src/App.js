import React, { Component } from 'react'
import Header from './components/headerComponent'
import Board from './components/boardComponent'
import Footer from './components/footerComponent'
import FooterPush from './components/footerPush'
import './styles/app.css'

class App extends Component {
  render() {
    return (
      <div id="root">
          <div className="wrapper">
             <Header />
             <Board />
             <FooterPush />
          </div>
         <Footer />
      </div>
    );
  }
}

export default App;
