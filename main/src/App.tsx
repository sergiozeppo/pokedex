import { Component, ReactNode } from 'react';
import Header from './views/Header/Header';
import './App.css';

class App extends Component {
  render(): ReactNode {
    return (
      <div className="container">
        <Header />
      </div>
    );
  }
}

export default App;
