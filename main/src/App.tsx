import { Component, ReactNode } from 'react';
import Header from './views/Header/Header';

class App extends Component {
  render(): ReactNode {
    return (
      <div>
        <h1>Pokedex App Works!</h1>
        <Header />
      </div>
    );
  }
}

export default App;
