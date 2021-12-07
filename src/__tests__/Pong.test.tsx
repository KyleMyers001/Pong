import React from 'react';
import ReactDOM from 'react-dom';
import Pong from '../components/Pong';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pong />, div);
  ReactDOM.unmountComponentAtNode(div);
});