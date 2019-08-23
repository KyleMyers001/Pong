import Bubbles from './Bubbles';
import Pong from './Pong';
import * as React from 'react';

interface State {
  canvas: string;
}

class App extends React.Component {
  bubbles: Bubbles;
  canvas: any;
  pong: Pong;
  state: State;
  constructor(props: any) {
    super(props);
    this.state = { canvas: 'pong'};
  }

  displayPong() {
    this.canvas = Pong;
    this.setState({canvas: 'pong'});
  }

  displayBubbles() {
    this.canvas = Bubbles;
    this.setState({canvas: 'bubbles'});
  }

  render() {
    var canvas = this.state.canvas;
    return (
      <div>
        <header className="header">
          <nav className="header__nav is-primary">
            <div className="header__nav container">
              <button className="header__nav__item" onClick={this.displayPong.bind(this)}>Canvas</button>
              <div className="header__nav__end">
                <button className="header__nav__item" onClick={this.displayPong.bind(this)}>Pong</button>
                <button className="header__nav__item" onClick={this.displayBubbles.bind(this)}>Bubbles</button>
              </div>  
            </div>
          </nav>
        </header>
        <section className="section">
          {
            canvas === 'pong' ? (
            <Pong />
          ) 
          : canvas === 'bubbles' ? (
            <Bubbles />
          ) 
          : null
          }
        </section>
        <footer className="footer">
        </footer>
      </div>
    )
  }
}

export default App;